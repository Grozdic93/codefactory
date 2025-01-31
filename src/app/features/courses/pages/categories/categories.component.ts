import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseModel } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../../../shared/components/section/section.component';
import { TranslateObjectPipe } from '../../../../shared/pipes/translate-object.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { UpcomingCourseComponent } from '../../../../core/layout/home/upcoming-courses/upcoming-course/upcoming-course.component';
import { UpcomingCoursesComponent } from '../../../../core/layout/home/upcoming-courses/upcoming-courses.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    TranslateObjectPipe,
    TranslateModule,
    UpcomingCourseComponent,
    UpcomingCoursesComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  courses: ICourseModel[] = [];
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe({
      next: (data) => {
        this.courses = data['courses'];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading courses';
        this.isLoading = false;
      },
    });
  }
}
