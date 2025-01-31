import {Component, Input, OnInit} from '@angular/core';
import {MiniSectionComponent} from "../../../../../shared/components/mini-section/mini-section.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-course-technologies-section',
  standalone: true,
  imports: [
    MiniSectionComponent,
    TranslateModule,
  ],
  templateUrl: './course-technologies-section.component.html',
  styleUrl: './course-technologies-section.component.scss'
})
export class CourseTechnologiesSectionComponent implements OnInit{
  @Input() tech?: { techName: string; techTags: string[] }[];

  ngOnInit() {

  }
}
