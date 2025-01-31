import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { ICourseModel } from '../models/course.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const courseDetailsResolver: ResolveFn<ICourseModel | { error: string }> = (route) => {
  const coursesService = inject(CoursesService);
  const courseId = route.paramMap.get('id');
  if (!courseId) {
    return of({ error: 'Course ID not found' });
  }
  return coursesService.getCourseById(courseId).pipe(
    catchError(err => of({ error: 'Course not found' }))
  );
};
