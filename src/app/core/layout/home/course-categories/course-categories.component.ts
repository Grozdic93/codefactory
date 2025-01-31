import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CourseCategoryComponent} from "./course-category/course-category.component";
import {LinkComponent} from "../../../../shared/components/link/link.component";
import {LangChangeEvent, TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-course-categories',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CourseCategoryComponent,
    LinkComponent,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './course-categories.component.html',
  styleUrl: './course-categories.component.scss'
})
export class CourseCategoriesComponent implements OnInit, OnDestroy {
  courseCategoryTitle!: string;
  card1title!: string;
  card2title!: string;
  card3title!: string;
  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService,
              private router: Router,) {
  }

  ngOnInit() {
    this.setTranslations();

    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslations();
    });

  }
  setTranslations() {
    this.translate.get('courseCategories.title').subscribe((res: string) => {
      this.courseCategoryTitle = res;
    });
    this.translate.get('courseCategories.card1title').subscribe((res: string) => {
      this.card1title = res;
    });

    this.translate.get('courseCategories.card2title').subscribe((res: string) => {
      this.card2title = res;
    });

    this.translate.get('courseCategories.card3title').subscribe((res: string) => {
      this.card3title = res;
    });
  }
  navigate(event:Event,link: string) {
    event.preventDefault();
    this.router.navigate(['/courses/categories', link]);
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
