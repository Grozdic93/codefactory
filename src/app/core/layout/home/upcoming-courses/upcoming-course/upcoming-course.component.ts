import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-course',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="course-item">
      <div class="flex">
        <h5>{{ courseName }}</h5>
        <div class="date">
          <p>Start: {{ courseStartDate | date : 'dd.MM.yyyy' }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './upcoming-course.component.scss',
})
export class UpcomingCourseComponent {
  @Input({ required: true }) courseName!: string;
  @Input({ required: true }) courseStartDate!: string;
}
