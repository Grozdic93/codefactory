import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {courseDetailsResolver} from "./features/courses/resolvers/course-details-resolver";
import {categoryCoursesResolver} from "./features/courses/resolvers/category-courses-resolver";

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./core/layout/home/home.component').then(m => m.HomeComponent),
    data: {animation: 'HomePage'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'courses/course-details/:id',
    loadComponent: () => import('./features/courses/pages/course-details/course-details.component').then(m => m.CourseDetailsComponent),
    resolve: {
      course: courseDetailsResolver
    },
    data: {animation: 'CourseDetailsPage'}
  },
  {
    path: 'courses/categories/:category',
    loadComponent: () => import('./features/courses/pages/categories/categories.component').then(m => m.CategoriesComponent),
    resolve: {
      courses: categoryCoursesResolver
    },
    data: {animation: 'CategoriesPage'}
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    data: {animation: 'AdminPage'}
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/admin/auth/auth.component').then(m => m.AuthComponent),
    data: {animation: 'AuthPage'}
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () => import('./features/static-pages/terms-and-conditions/terms-and-conditions.component').then(m => m.TermsAndConditionsComponent),
    data: {animation: 'TermsPage'}
  },
  {
    path: 'seminar-rooms',
    loadComponent: () => import('./features/static-pages/seminar-room/seminar-room.component').then(m => m.SeminarRoomComponent),
    data: {animation: 'SeminarRoomsPage'}
  },
  {
    path: 'payment-and-financing',
    loadComponent: () => import('./features/static-pages/payment-and-financing/payment-and-financing.component').then(m => m.PaymentAndFinancingComponent),
    data: {animation: 'PaymentPage'}
  },
  {
    path: 'custom-courses',
    loadComponent: () => import('./features/static-pages/custom-courses/custom-courses.component').then(m => m.CustomCoursesComponent),
    data: {animation: 'CustomCoursesPage'}
  }, {
    path: 'team',
    loadComponent: () => import('./features/static-pages/team/team.component').then(m => m.TeamComponent),
    data: {animation: 'TeamPage'}
  },
  {
    path: 'why-us',
    loadComponent: () => import('./features/static-pages/why-us/why-us.component').then(m => m.WhyUsComponent),
    data: {animation: 'whyUsPage'}
  },
  {
    path: 'imprint',
    loadComponent: () => import('./features/static-pages/imprint/imprint.component').then(m => m.ImprintComponent),
    data: {animation: 'imprintPage'}
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/static-pages/faq/faq.component').then(m => m.FaqComponent),
    data: {animation: 'faqPage'}
  },
  {
    path: 'brand-ambassador',
    loadComponent: () => import('./features/static-pages/brand-ambassador/brand-ambassador.component').then(m => m.BrandAmbassadorComponent),
    data: {animation: 'brandAmbassadorPage'}
  },
  {
    path: 'career-net',
    loadComponent: () => import('./features/static-pages/career-net/career-net.component').then(m => m.CareerNetComponent),
    data: {animation: 'careerNetPage'}
  },
  {
    path: 'mission-statement',
    loadComponent: () => import('./features/static-pages/mission-statement/mission-statement.component').then(m => m.MissionStatementComponent),
    data: {animation: 'missionStatementPage'}
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/static-pages/projects/projects.component').then(m => m.ProjectsComponent),
    data: {animation: 'projectsPage'}
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
