import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../environments/environment';

declare var grecaptcha: any;

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
})
export class ContactDialogComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  isLoading = false;
  contactForm: FormGroup;
  submitSuccess = false;
  submitError = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ContactDialogComponent>
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[+]?\\d{7,}$')],
      ],
      callMeBack: [false],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      this.isLoading = true;
      try {
        const token = await grecaptcha.enterprise.execute(
           environment.recaptchaSiteKey,
          { action: 'submit' }
        );

        const verificationBody = {
          event: {
            token: token,
            expectedAction: 'submit',
            siteKey:  environment.recaptchaSiteKey,
          },
        };

        this.http
          .post(
            `https://recaptchaenterprise.googleapis.com/v1/projects/codefactory-18da0/assessments?key=${environment.googleCloudApiKey}`,
            verificationBody
          )
          .subscribe({
            next: (response: any) => {
              if (response.tokenProperties.valid) {
                const formData = this.contactForm.value;
                this.http
                  .post(environment.backendUrlS, formData)
                  .subscribe({
                    next: (formResponse) => {
                      this.handleResponse(true);
                      this.contactForm.reset();
                    },
                    error: (formError) => {
                      console.error('Error submitting form', formError);
                      this.handleResponse(false);
                    },
                    complete: () => {},
                  });
              } else {
                console.error('Invalid reCAPTCHA token', response);
                this.handleResponse(false);
              }
            },
            error: (verificationError) => {
              console.error(
                'Error verifying reCAPTCHA token',
                verificationError
              );
              this.handleResponse(false);
            },
          });
      } catch (error) {
        console.error('Error executing reCAPTCHA', error);
        this.handleResponse(false);
      }
    }
  }
  private handleResponse(success: boolean): void {
    this.submitSuccess = success;
    this.submitError = !success;
    this.isLoading = false;

    this.snackBar.open(
      success ? 'Form submitted successfully!' : 'Something went wrong :(',
      'Close',
      {
        duration: 10000,
        panelClass: success ? ['snack-bar-success'] : ['snack-bar-error'],
      }
    );
    // this.dialogRef.close();
  }
}
