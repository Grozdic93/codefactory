import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CoursesService} from "../../courses/services/courses.service";
import {ICourseModel} from "../../courses/models/course.model";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  courseForm: FormGroup;
  isLoggedIn = false;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private authService: AuthService) {

    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      img: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      price: [0, [Validators.required]],
      attendanceTimes: ['', Validators.required],
      duration: ['', Validators.required],
      level: ['', Validators.required],
      location: ['', Validators.required],
      requirements: ['', Validators.required],
      technologies: this.fb.array([]),
      financingOptions: this.fb.array([])
    });
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  get financingOptions() {
    return this.courseForm.get('financingOptions') as FormArray;
  }

  get technologies() {
    return this.courseForm.get('technologies') as FormArray;
  }

  addTechnology() {
    this.technologies.push(this.fb.group({
      techName: ['', Validators.required],
      techTags: ['', Validators.required]
    }));
  }

  addFinancingOption() {
    this.financingOptions.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required]
    }));
  }

  async onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: ICourseModel = this.courseForm.value;

      try {
        await this.coursesService.addCourse(newCourse);
        console.log('Course added successfully');
        this.courseForm.reset();
      } catch (error) {
        console.error('Error adding course: ', error);
      }
    }
  }
  onLogout() {
    this.authService.logout();
  }
}
