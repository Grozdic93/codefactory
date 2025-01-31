import { ICourseModel } from '../models/course.model';


export function toFirestoreCourse(course: ICourseModel): any {
  return {
    ...course,
  };
}

export function fromFirestoreCourse(data: any): ICourseModel {
  return {
    ...data,
  };
}
