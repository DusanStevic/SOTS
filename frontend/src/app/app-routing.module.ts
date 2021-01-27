import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TestDetailsTeacherComponent } from './tests/test-details-teacher/test-details-teacher.component';
import { TestDetailsComponent } from './tests/test-details/test-details.component';
import { TestsComponent } from './tests/tests/tests.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  {path: 'forbidden-page', component: ForbiddenPageComponent},
  {path: 'not-found-page', component: NotFoundPageComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT|ADMIN'}
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT'}
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT'}
  },
  {
    path: 'tests/:id',
    component: TestsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT'}
  },
  {
    path: 'test-details/:id',
    component: TestDetailsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT'}
  },
  {
    path: 'test-details-teacher/:id',
    component: TestDetailsTeacherComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
