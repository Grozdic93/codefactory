import {Component, OnInit} from '@angular/core';
import {LinkComponent} from "../link/link.component";
import {LogoScrollerComponent} from "./logo-scroller/logo-scroller.component";
import {TranslateModule} from "@ngx-translate/core";
import {NgOptimizedImage} from "@angular/common";
import {PROJECT_IMAGES} from "../../studentProjectsImages";

@Component({
  selector: 'app-after-course',
  standalone: true,
  imports: [
    LinkComponent,
    LogoScrollerComponent,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './after-course.component.html',
  styleUrl: './after-course.component.scss'
})
export class AfterCourseComponent  implements OnInit{
  studentProjects!:{name:string, image: string, link: string}[];
  ngOnInit() {
    this.studentProjects = PROJECT_IMAGES.slice(0,3);
  }

}
