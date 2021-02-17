import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { HomeComponent } from './home/home.component';
import { KnowledgeSpaceDetailsComponent } from './kst/knowledge-space-details/knowledge-space-details.component';
import { KnowledgeSpacesComparisonComponent } from './kst/knowledge-spaces-comparison/knowledge-spaces-comparison.component';
import { KnowledgeSpacesComponent } from './kst/knowledge-spaces/knowledge-spaces.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TestDetailsCompletedStudentComponent } from './tests/test-details-completed-student/test-details-completed-student.component';
import { TestDetailsTeacherComponent } from './tests/test-details-teacher/test-details-teacher.component';
import { TestDetailsUncompletedStudentComponent } from './tests/test-details-uncompleted-student/test-details-uncompleted-student.component';
import { TestGenesisComponent } from './tests/test-genesis/test-genesis.component';
import { TestsCompletedStudentComponent } from './tests/tests-completed-student/tests-completed-student.component';
import { TestsTeacherComponent } from './tests/tests-teacher/tests-teacher.component';
import { TestsUncompletedStudentComponent } from './tests/tests-uncompleted-student/tests-uncompleted-student.component';


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
    path: 'tests-teacher/:id',
    component: TestsTeacherComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },
  {
    path: 'test-details-teacher/:id',
    component: TestDetailsTeacherComponent,
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
    path: 'test-details-completed-student/:id',
    component: TestDetailsCompletedStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  },
  {
    path: 'tests-uncompleted-student/:id',
    component: TestsUncompletedStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  },
  {
    path: 'test-details-uncompleted-student/:id',
    component: TestDetailsUncompletedStudentComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'STUDENT'}
  },
  {
    path: 'test-genesis/:id',
    component: TestGenesisComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },
  {
    path: 'knowledge-spaces/:id',
    component: KnowledgeSpacesComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },
  {
    path: 'knowledge-space-details/:id',
    component: KnowledgeSpaceDetailsComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },
  {
    path: 'knowledge-spaces-comparison/:id',
    component: KnowledgeSpacesComparisonComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
