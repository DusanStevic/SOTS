import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TestDetailsCompletedStudentComponent } from './tests/test-details-completed-student/test-details-completed-student.component';
import { TestDetailsTeacherComponent } from './tests/test-details-teacher/test-details-teacher.component';
import { TestDetailsComponent } from './tests/test-details/test-details.component';
import { TestsCompletedStudentComponent } from './tests/tests-completed-student/tests-completed-student.component';
import { TestsTeacherComponent } from './tests/tests-teacher/tests-teacher.component';
import { TestsComponent } from './tests/tests/tests.component';
import { TestForStudentComponent} from './tests/test-for-student/test-for-student.component';
import { TestForTakeComponent} from './tests/test-for-take/test-for-take.component';
import { TestWithSameDomainComponent} from './tests/test-with-same-domain/test-with-same-domain.component';

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
    path: 'test-with-same-domain/:id',
    component: TestWithSameDomainComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER|STUDENT'}
  },
  {
    path: 'tests-teacher/:id',
    component: TestsTeacherComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },
  {
    path: 'tests-completed-student/:id',
    component: TestsCompletedStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  },
  {
    path: 'test-for-student/:id',
    component: TestForStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  },
  {
    path: 'test-for-take/:id',
    component: TestForTakeComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
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
  },
  {
    path: 'test-details-completed-student/:id',
    component: TestDetailsCompletedStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
