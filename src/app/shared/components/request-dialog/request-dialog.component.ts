import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../features/courses/services/courses.service';
import { TranslateObjectPipe } from '../../pipes/translate-object.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

declare var grecaptcha: any;

export interface DialogData {
  action: string;
  courses: {
    id: string;
    name: string;
    nameDe: string;
    price: string;
    dates: { startDate: string; endDate: string }[];
    attendanceTimesDe: string;
    attendanceTimes: string;
  }[];
  id: string;
}

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    TranslateObjectPipe,
    MatDialogActions,
    MatDialogContent,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    TranslateModule,
    MatDialogTitle,
    MatIcon,
  ],
})
export class RequestDialogComponent implements OnInit, AfterViewInit {
  readonly dialogRef = inject(MatDialogRef<RequestDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);
  form: FormGroup;
  submitSuccess = false;
  submitError = false;
  isLoading = false;
  courses: {
    attendanceTimesDe: string;
    attendanceTimes: string;
    id: string;
    name: string;
    nameDe: string;
    price: string;
    dates: { startDate: string; endDate: string }[];
  }[] = [];
  selectedCourseDates: { startDate: string; endDate: string }[] = [];
  fileName = '';
  private _selectedAction = 'estimate';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private coursesService: CoursesService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      sv: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      course: ['', Validators.required],
      date: ['', Validators.required],
      to: ['', Validators.required],
      fileUpload: [null],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[+]?\\d{7,}$')],
      ],
      description: [null],
      selectedAction: [this.selectedAction],
      voucher: [''],
    });
  }

  ngOnInit() {
    this.selectedAction = this.data.action || 'estimate';
    this.form.patchValue({ selectedAction: this.selectedAction });

    this.form.get('selectedAction')?.valueChanges.subscribe((action) => {
      this.selectedAction = action;
      this.updateFileValidation();
    });
    this.form.get('to')?.valueChanges.subscribe((to) => {
      this.handleToChange(to);
      this.updateFileValidation();
    });
    this.form.get('course')?.valueChanges.subscribe((courseId) => {
      const selectedCourse = this.courses.find(
        (course) => course.id === courseId
      );
      this.selectedCourseDates = selectedCourse ? selectedCourse.dates : [];
    });

    this.coursesService.getCourseNamesForDialog().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error fetching course names and IDs:', error);
        this.courses = [];
      },
    });

    this.form.get('selectedAction')?.valueChanges.subscribe((action) => {
      this.selectedAction = action;
      this.updateFileValidation();
    });
  }

  set selectedAction(value: string) {
    this._selectedAction = value;
    // Ensure the form control is updated when the property changes
    if (this.form && this.form.get('selectedAction')?.value !== value) {
      this.form.patchValue({ selectedAction: value });
      this.updateFileValidation();
    }
  }

  get selectedAction(): string {
    return this._selectedAction;
  }

  ngAfterViewInit() {}

  private updateFileValidation(): void {
    const fileControl = this.form.get('fileUpload');
    const toValue = this.form.get('to')?.value;

    if (
      this.selectedAction === 'register' &&
      toValue &&
      ['AMS', 'WAFF', 'other'].includes(toValue)
    ) {
      fileControl?.setValidators([Validators.required]);
    } else {
      fileControl?.clearValidators();
      fileControl?.setValue(null); // Clear the file when not required
    }

    fileControl?.updateValueAndValidity();
  }

  private handleToChange(to: string): void {
    if (to === 'other') {
      this.form.get('description')?.setValidators(Validators.required);
    } else {
      this.form.get('description')?.clearValidators();
    }
    this.form.get('description')?.updateValueAndValidity();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.fileName = file.name;
      this.form.patchValue({ fileUpload: file });
      this.form.get('fileUpload')!.updateValueAndValidity();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      console.error('Form is invalid:', this.form.errors);
      return;
    }

    this.isLoading = true;
    try {
      const token = await grecaptcha.enterprise.execute(
        environment.recaptchaSiteKey, // From environment
        { action: 'submit' }
      );

      const verificationBody = {
        event: {
          token: token,
          expectedAction: 'submit',
          siteKey: '6LcBKBsqAAAAAKu4BU7xi2BJYf7lGk5aC7newk1a',
        },
      };

      this.http.post(
        `https://recaptchaenterprise.googleapis.com/v1/projects/codefactory-18da0/assessments?key=${environment.googleCloudApiKey}`, // Use environment variable
        verificationBody
      )
        .subscribe({
          next: (response: any) => {
            if (response.tokenProperties.valid) {
              this.submitForm();
            } else {
              console.error('Invalid reCAPTCHA token', response);
              this.handleResponse(false);
            }
          },
          error: (verificationError) => {
            console.error('Error verifying reCAPTCHA token', verificationError);
            this.handleResponse(false);
          },
        });
    } catch (error) {
      console.error('Error executing reCAPTCHA', error);
      this.handleResponse(false);
    }
  }

  private submitForm(): void {
    const formData = new FormData();
    formData.append('type', this.selectedAction);

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.value != null) {
        if (key === 'course') {
          const selectedCourse = this.courses.find(
            (course) => course.id === control.value
          );
          if (selectedCourse) {
            formData.append('course', selectedCourse.nameDe);
            formData.append('price', selectedCourse.price);
            formData.append(
              'attendanceTimes',
              selectedCourse.attendanceTimesDe
            );
          }
        } else if (key === 'date') {
          let dates = control.value.split(' - ');
          let [startDate, endDate] = dates;
          console.log(dates);
          console.log(startDate);
          console.log(endDate);

          let string = `${new Date(startDate).toLocaleDateString('de-EU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })} - ${new Date(endDate).toLocaleDateString('de-EU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}`;
          console.log(string);

          formData.append('course_date', string);
        } else if (key !== 'course') {
          if (control.value instanceof File) {
            formData.append(key, control.value, control.value.name);
          } else {
            formData.append(key, control.value.toString());
          }
        }
      }
    });
    this.logFormData(formData);
    this.http
    this.http.post(environment.backendUrlS, formData)
      .subscribe({
        next: (response) => {
          this.handleResponse(true);
          this.form.reset();
          this.onNoClick();
        },
        error: (error) => {
          this.handleResponse(false);
        },
      });
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
  }

  private logFormData(formData: FormData): void {
    console.log('Form Data:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }
}
