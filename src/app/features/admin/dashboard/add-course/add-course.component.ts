import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CoursesService } from '../../../courses/services/courses.service';
import { ICourseModel } from '../../../courses/models/course.model';
import { SectionComponent } from '../../../../shared/components/section/section.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, SectionComponent, NgForOf, NgIf],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      nameDe: ['', Validators.required],
      category: ['', Validators.required],
      categoryDe: ['', Validators.required],
      language: ['', Validators.required],
      languageDe: ['', Validators.required],
      description: ['', Validators.required],
      descriptionDe: ['', Validators.required],
      dates: this.fb.array([this.createDateGroup()], Validators.required),
      img: ['', Validators.required],
      thumbnail: ['', Validators.required],
      price: [0, Validators.required],
      attendanceTimes: ['', Validators.required],
      attendanceTimesDe: ['', Validators.required],
      duration: ['', Validators.required],
      durationDe: ['', Validators.required],
      level: ['', Validators.required],
      levelDe: ['', Validators.required],
      location: ['', Validators.required],
      requirements: ['', Validators.required],
      requirementsDe: ['', Validators.required],
      technologies: this.fb.array([]),
      financingOptions: this.fb.array([]),
    });
  }

  createDateGroup(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  get dates(): FormArray {
    return this.courseForm.get('dates') as FormArray;
  }

  addDate(): void {
    this.dates.push(this.createDateGroup());
  }

  removeDate(index: number): void {
    if (this.dates.length > 1) {
      this.dates.removeAt(index);
    }
  }

  get financingOptions() {
    return this.courseForm.get('financingOptions') as FormArray;
  }

  get technologies() {
    return this.courseForm.get('technologies') as FormArray;
  }

  addTechnology() {
    this.technologies.push(
      this.fb.group({
        techName: ['', Validators.required],
        techTags: ['', Validators.required],
      })
    );
  }

  removeTechnology(index: number) {
    this.technologies.removeAt(index);
  }

  addFinancingOption() {
    this.financingOptions.push(
      this.fb.group({
        name: ['', Validators.required],
        nameDe: ['', Validators.required],
        description: ['', Validators.required],
        descriptionDe: ['', Validators.required],
        img: ['', Validators.required],
      })
    );
  }

  removeFinancingOption(index: number) {
    this.financingOptions.removeAt(index);
  }

  async onSubmit() {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;

      const newCourse: ICourseModel = {
        id: '', // To be set by Firestore
        ...formValue,
      };

      try {
        await this.coursesService.addCourse(newCourse);
        this.courseForm.reset();
        this.dates.clear();
        this.dates.push(this.createDateGroup());
      } catch (error) {
        console.error('Error adding course: ', error);
      }
    }
  }
}
