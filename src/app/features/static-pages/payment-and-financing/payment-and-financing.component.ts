import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { FinancingComponent } from '../../../shared/components/financing/financing.component';
import { MiniSectionComponent } from '../../../shared/components/mini-section/mini-section.component';
import { OptionComponent } from '../../components/financing/option/option.component';
import { MatFabButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  DialogData,
  RequestDialogComponent,
} from '../../../shared/components/request-dialog/request-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { CoursesService } from '../../courses/services/courses.service';
import { HeroComponent } from '../../../shared/components/hero/hero.component';

@Component({
  selector: 'app-payment-and-financing',
  standalone: true,
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    SectionComponent,
    FinancingComponent,
    MiniSectionComponent,
    OptionComponent,
    MatFabButton,
    TranslateModule,
    HeroComponent,
  ],
  templateUrl: './payment-and-financing.component.html',
  styleUrl: './payment-and-financing.component.scss',
})
export class PaymentAndFinancingComponent implements OnInit {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  private courseId = '';

  courseNamesAndIds: {
    id: string;
    name: string;
    nameDe: string;
    price: string;
    attendanceTimesDe: string;
    attendanceTimes: string;
    dates: { startDate: string; endDate: string }[];
  }[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService.getCourseNamesForDialog().subscribe((courses) => {
      this.courseNamesAndIds = courses;
    });
  }

  openEstimateDialog(action: string = 'estimate'): void {
    const dialogData: DialogData = {
      action: action,
      courses: this.courseNamesAndIds,
      id: this.courseId,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.autoFocus = false;
    this.dialog.open(RequestDialogComponent, dialogConfig);
  }

  navigateToSection(element: HTMLElement) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
