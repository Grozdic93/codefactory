import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { ICourseModel } from "../../../courses/models/course.model";
import { CoursesService } from "../../../courses/services/courses.service";
import { TranslateService } from '@ngx-translate/core';
import { TranslateObjectPipe } from "../../../../shared/pipes/translate-object.pipe";

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  templateUrl: './manage-courses.component.html',
  imports: [
    NgForOf,
    DatePipe,
    EditCourseComponent,
    NgIf,
    TranslateObjectPipe
  ],
  styleUrls: ['./manage-courses.component.scss']
})
export class ManageCoursesComponent implements OnInit {
  courses: ICourseModel[] = [];
  courseToEdit?: ICourseModel;

  constructor(private coursesService: CoursesService, private translateService: TranslateService) { }

  ngOnInit() {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  setCourseToEdit(course: ICourseModel) {
    this.courseToEdit = { ...course };
  }

  handleCourseEdited(editedCourse: ICourseModel) {
    const courseIndex = this.courses.findIndex(c => c.id === editedCourse.id);
    if (courseIndex > -1) {
      this.courses[courseIndex] = editedCourse;
    }
    this.courseToEdit = undefined;
  }

  deleteCourse(course: ICourseModel) {
    const courseId = course.id;
    this.coursesService.deleteCourse(courseId)
      .then(() => {
        console.log('Course deleted successfully!');
        this.courses = this.courses.filter(c => c.id !== courseId);
      })
      .catch(error => {
        console.error('Error deleting course:', error);
      });
  }
}
