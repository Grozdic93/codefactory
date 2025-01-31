import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ICourseModel } from '../../models/course.model';
import { TranslateObjectPipe } from '../../../../shared/pipes/translate-object.pipe';
import { SectionComponent } from '../../../../shared/components/section/section.component';
import { FinancingComponent } from '../../../../shared/components/financing/financing.component';
import { TitleSectionComponent } from '../../components/course-details-sections/title-section/title-section.component';
import { CourseDetailsInfoSectionComponent } from '../../components/course-details-sections/course-details-info-section/course-details-info-section.component';
import { MiniSectionComponent } from '../../../../shared/components/mini-section/mini-section.component';
import { CourseKeyFactsSectionComponent } from '../../components/course-details-sections/course-key-facts-section/course-key-facts-section.component';
import { CourseTechnologiesSectionComponent } from '../../components/course-details-sections/course-technologies-section/course-technologies-section.component';
import { Subscription } from 'rxjs';
import { CourseRequirementsSectionComponent } from '../../components/course-details-sections/course-requirements-section/course-requirements-section.component';
import { AfterCourseComponent } from '../../../../shared/components/after-course/after-course.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    TranslateObjectPipe,
    SectionComponent,
    FinancingComponent,
    TitleSectionComponent,
    CourseDetailsInfoSectionComponent,
    MiniSectionComponent,
    CourseKeyFactsSectionComponent,
    CourseTechnologiesSectionComponent,
    CourseRequirementsSectionComponent,
    AfterCourseComponent,
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course!: ICourseModel;
  error: string | null = null;
  isLoading: boolean = false;
  courseTechnologies?: { techName: string; techTags: string }[];
  tech?: { techName: string; techTags: string[] }[];
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription.add(
      this.route.data.subscribe((data) => {
        if ('error' in data['course']) {
          this.error = data['course'].error;
        } else {
          this.course = data['course'];
          this.updateTech();
        }
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateTech() {
    this.courseTechnologies = this.course?.technologies;
    if (this.courseTechnologies) {
      this.tech = this.courseTechnologies.map(
        (tech: { techName: string; techTags: string }) => {
          return {
            techName: tech.techName,
            techTags: tech.techTags.split(','),
          };
        }
      );
    }
  }

  getClosestDate(): { startDate: string; endDate: string } {

    return this.course?.dates[0];

  }
}
