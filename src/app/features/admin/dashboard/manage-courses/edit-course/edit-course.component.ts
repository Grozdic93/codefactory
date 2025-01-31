import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ICourseModel} from "../../../../courses/models/course.model";
import {CoursesService} from "../../../../courses/services/courses.service";

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  @Input() course: ICourseModel | undefined;
  isEditing = false;
  myForm!: FormGroup;
  @Output() courseEdited = new EventEmitter<ICourseModel>();

  constructor(private coursesService: CoursesService,
              private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {

    if (this.course) {
      this.myForm.patchValue({ name: this.course.name });
    }
  }


  editCourse() {
    if (this.course && this.myForm.valid) {
      const editedCourse: ICourseModel = {
        ...this.course,
        ...this.myForm.value
      };

      this.coursesService.updateCourse(editedCourse.id, editedCourse)
        .then(() => {
          this.isEditing = false;
          this.courseEdited.emit(editedCourse);
        })
        .catch((error: Error) => {
          console.error('Error editing course:', error);
        });
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
