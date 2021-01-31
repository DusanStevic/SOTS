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
import { TestScoreDialogComponent } from './test-score-dialog/test-score-dialog.component';
import { TestsUncompletedStudentComponent } from './tests-uncompleted-student/tests-uncompleted-student.component';
import { TestDetailsUncompletedStudentComponent } from './test-details-uncompleted-student/test-details-uncompleted-student.component';



@NgModule({
  declarations: [TestsComponent,
                TestDetailsComponent,
                TestDetailsTeacherComponent,
                TestsTeacherComponent,
                TestsCompletedStudentComponent,
                TestDetailsCompletedStudentComponent,
                TestScoreDialogComponent,
                TestsUncompletedStudentComponent,
                TestDetailsUncompletedStudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // This is very important for angular material dialog
  entryComponents: [
    TestScoreDialogComponent
  ],
  exports: [
    TestsComponent,
    TestDetailsComponent,
    TestDetailsTeacherComponent,
    TestsTeacherComponent,
    TestsCompletedStudentComponent,
    TestDetailsCompletedStudentComponent,
    TestScoreDialogComponent,
    TestsUncompletedStudentComponent,
    TestDetailsUncompletedStudentComponent
  ]
})
export class TestsModule { }
