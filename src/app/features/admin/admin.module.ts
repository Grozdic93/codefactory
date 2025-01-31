import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authGuard} from "./auth/guards/auth.guard";
import {AddCourseComponent} from "./dashboard/add-course/add-course.component";
import {DashboardStaticComponent} from "./dashboard/dashboard-static/dashboard-static.component";
import {ManageCoursesComponent} from "./dashboard/manage-courses/manage-courses.component";
import { ManageUsersComponent } from './dashboard/manage-users/manage-users.component';

const routes: Routes = [
  { path: '',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { allowedRoles: ['admin'] } ,
    children: [
      {
        path: '',
        component: DashboardStaticComponent

      },
      {
        path: 'add-course',
        component: AddCourseComponent
      },
      {
        path: 'manage-courses',
        component: ManageCoursesComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    DashboardComponent,
    AuthComponent,
    DashboardStaticComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule]
})
export class AdminModule { }
