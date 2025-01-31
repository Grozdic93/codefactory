import { Component, input, Input, OnInit } from '@angular/core';
import { UpcomingCourseComponent } from './upcoming-course/upcoming-course.component';
import { CoursesService } from '../../../../features/courses/services/courses.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateObjectPipe } from '../../../../shared/pipes/translate-object.pipe';
import { ICourseModel } from '../../../../features/courses/models/course.model';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upcoming-courses',
  standalone: true,
  imports: [
    UpcomingCourseComponent,
    TranslateModule,
    TranslateObjectPipe,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './upcoming-courses.component.html',
  styleUrls: ['./upcoming-courses.component.scss'],
})
export class UpcomingCoursesComponent implements OnInit {
  @Input() categoryName?: string;
  @Input() image?: string;
  @Input() courses?:
    | {
        id: string;
        name: string;
        nameDe: string;
        attendanceTimes: string;
        attendanceTimesDe: string;
        dates: { startDate: string; endDate: string }[];
        price: string;
      }[]
    | ICourseModel[];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    if (!this.courses) {
      this.coursesService.getLatestCourses().subscribe({
        next: (courses) => {
          const today = new Date();

          this.courses = courses
            .map((course) => {
              const upcomingDates = course.dates.filter(
                (d) => new Date(d.startDate) >= today
              );
              return {
                ...course,
                attendanceTimes: course.attendanceTimes || '',
                attendanceTimesDe: course.attendanceTimesDe || '',
                dates: upcomingDates,
                price: `${course.price}`,
              };
            })
            .filter((course) => course.dates.length > 0);
        },
        error: (error) => {
          console.error('Error fetching latest courses:', error);
          this.courses = [];
        },
      });
    }
  }
}
