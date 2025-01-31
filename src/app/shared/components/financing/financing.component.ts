import { Component, inject, Input, OnInit } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CoursesService } from '../../../features/courses/services/courses.service';
import {
  DialogData,
  RequestDialogComponent,
} from '../request-dialog/request-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { ICourseModel } from '../../../features/courses/models/course.model';
import { Overlay } from '@angular/cdk/overlay';

interface IFinancingOptions {
  name: string;
  nameDe: string;
  img: string;
}

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [
    SectionComponent,
    NgOptimizedImage,
    MatButton,
    MatFabButton,
    TranslateModule,
    NgIf,
    SectionComponent,
  ],
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.scss'],
})
export class FinancingComponent implements OnInit {
  private overlay = inject(Overlay);
  private dialog = inject(MatDialog);
  private coursesService = inject(CoursesService);
  @Input() course?: ICourseModel;
  courseId: string = 'nope';
  courseNamesAndIds: {
    id: string;
    name: string;
    nameDe: string;
    price: string;
    attendanceTimesDe: string;
    attendanceTimes: string;
    dates: { startDate: string; endDate: string }[];
  }[] = [];

  ngOnInit() {
    this.coursesService.getCourseNamesForDialog().subscribe((courses) => {
      this.courseNamesAndIds = courses;
    });
    if (this.course) {
      this.courseId = this.course.id;
    }
  }
  getFinancingOptions(name: string): string[] {
    let tags: string[] = [];
    if (this.course) {
      let financingOptions = this.course.financingOptions;
      financingOptions.forEach((option: IFinancingOptions) => {
        if (option.name === name) {
          tags.push(option.name);
        }
      });
    }
    return tags;
  }

  openDialog(action: string = 'estimate'): void {
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
}
