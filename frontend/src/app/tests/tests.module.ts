import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TestDetailsTeacherComponent } from './test-details-teacher/test-details-teacher.component';
import { TestsTeacherComponent } from './tests-teacher/tests-teacher.component';
import { TestsCompletedStudentComponent } from './tests-completed-student/tests-completed-student.component';
import { TestDetailsCompletedStudentComponent } from './test-details-completed-student/test-details-completed-student.component';



@NgModule({
  declarations: [TestsComponent, TestDetailsComponent, TestDetailsTeacherComponent, TestsTeacherComponent, TestsCompletedStudentComponent, TestDetailsCompletedStudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TestsComponent, TestDetailsComponent, TestDetailsTeacherComponent
  ]
})
export class TestsModule { }
