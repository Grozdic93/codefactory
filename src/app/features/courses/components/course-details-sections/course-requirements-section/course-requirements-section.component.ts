import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-course-requirements-section',
  standalone: true,
  imports: [
    DatePipe,
    TranslateModule
  ],
  templateUrl: './course-requirements-section.component.html',
  styleUrl: './course-requirements-section.component.scss'
})
export class CourseRequirementsSectionComponent {
@Input({required:true}) requirements!:string;
@Input({required:true}) dates!:{startDate:string, endDate:string}[];
}
