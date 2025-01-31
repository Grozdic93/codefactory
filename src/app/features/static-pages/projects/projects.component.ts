import {AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {SectionComponent} from "../../../shared/components/section/section.component";
import {HeroComponent} from "../../../shared/components/hero/hero.component";
import {TranslateModule} from "@ngx-translate/core";
import {PROJECT_IMAGES} from "../../../shared/studentProjectsImages";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SectionComponent,
    HeroComponent,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
students!:{name:string, image: string, link: string}[]
  @ViewChildren('imgWrapper') imgWrappers!: QueryList<ElementRef>;

  ngOnInit() {
  this.students = PROJECT_IMAGES
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // this.imgWrappers.forEach(imgWrapper => {
    //   this.renderer.listen(imgWrapper.nativeElement, 'mouseenter', () => this.onMouseEnter(imgWrapper));
    //   this.renderer.listen(imgWrapper.nativeElement, 'mouseleave', () => this.onMouseLeave(imgWrapper));
    // });
  }

  // onMouseEnter(imgWrapper: ElementRef): void {
  //   const randomDegree = Math.floor(Math.random() * 26) - 15;
  //   this.renderer.setStyle(imgWrapper.nativeElement, 'transform', `rotate(${randomDegree}deg)`);
  // }
  //
  // onMouseLeave(imgWrapper: ElementRef): void {
  //   this.renderer.setStyle(imgWrapper.nativeElement, 'transform', 'rotate(0deg)');
  // }
}
