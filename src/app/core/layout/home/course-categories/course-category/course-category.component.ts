import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-course-category',
  standalone: true,
  imports: [
  ],
  templateUrl: './course-category.component.html',
  styleUrl: './course-category.component.scss'
})
export class CourseCategoryComponent {
@Input({required: true}) overlayTitle!: string;
@Input({required: true}) imagePath!: string;


}
