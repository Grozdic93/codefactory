// category-courses-resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { ICourseModel } from '../models/course.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const categoryCoursesResolver: ResolveFn<ICourseModel[]> = (route) => {
  const coursesService = inject(CoursesService);
  const category = route.paramMap.get('category');
  if (!category) {
    return of([]);
  }
  return coursesService.getCoursesByCategory(category).pipe(
    catchError(err => of([]))
  );
};
