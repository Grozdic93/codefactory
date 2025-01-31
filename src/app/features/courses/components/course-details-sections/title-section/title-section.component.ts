import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LinkComponent } from "../../../../../shared/components/link/link.component";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { RequestDialogComponent } from "../../../../../shared/components/request-dialog/request-dialog.component";
import { Overlay } from "@angular/cdk/overlay";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [
    LinkComponent,
    CurrencyPipe,
    ButtonComponent,
    DatePipe,
    TranslateModule
  ],
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss'],
  providers: [DatePipe]
})
export class TitleSectionComponent implements OnInit, OnChanges {
  @Input({ required: true }) courseName!: string;
  @Input({ required: true }) startDate!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) thumb!: string;

  formattedDate?: string;

  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  ngOnInit() {
    this.formatStartDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startDate']) {
      this.formatStartDate();
    }
  }

  private formatStartDate() {
    if (this.startDate && this.isValidDate(this.startDate)) {
      const dateObject = new Date(this.startDate);
      this.formattedDate = this.datePipe.transform(dateObject, 'dd.MM.yyyy') || '';
    } else {
      this.formattedDate = this.startDate;
    }
  }

  private isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  openRegisterDialog() {
    const dialogData = { action: 'register' };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }

  openEstimateDialog() {
    const dialogData = { action: 'estimate' };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }
}
