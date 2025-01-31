import {Component, Input} from '@angular/core';
import {MiniSectionComponent} from "../../../../../shared/components/mini-section/mini-section.component";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-course-key-facts-section',
  standalone: true,
  imports: [
    MiniSectionComponent,
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
    CurrencyPipe
  ],
  templateUrl: './course-key-facts-section.component.html',
  styleUrl: './course-key-facts-section.component.scss'
})
export class CourseKeyFactsSectionComponent {
@Input({required:true}) duration!: string;
@Input({required:true}) language!: string;
@Input({required:true}) location!: string;
@Input({required:true}) times!: string;
@Input({required:true}) price!: number;
@Input({required:true}) level!: string;
}
