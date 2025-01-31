import { Component, OnInit } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UnlockPotentialSectionComponent } from './unlock-potential-section/unlock-potential-section.component';
import { WhyCodefactoryComponent } from './why-codefactory/why-codefactory.component';
import { UpcomingCoursesComponent } from './upcoming-courses/upcoming-courses.component';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { CourseCategoriesComponent } from './course-categories/course-categories.component';
import { FinancingComponent } from '../../../shared/components/financing/financing.component';
import { AfterCourseComponent } from '../../../shared/components/after-course/after-course.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MeetTheTeamComponent } from '../../../shared/components/meet-the-team/meet-the-team.component';
import { ITeam } from '../../../shared/team.model';
import { TRAINERS } from '../../../shared/team';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingPageComponent,
    UnlockPotentialSectionComponent,
    WhyCodefactoryComponent,
    UpcomingCoursesComponent,
    SectionComponent,
    CourseCategoriesComponent,
    FinancingComponent,
    AfterCourseComponent,
    AboutUsComponent,
    MeetTheTeamComponent,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  team!: ITeam[];
  ngOnInit() {
    this.team = TRAINERS;
  }
}
