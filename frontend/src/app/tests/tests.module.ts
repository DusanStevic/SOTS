import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TestDetailsTeacherComponent } from './test-details-teacher/test-details-teacher.component';
import { TestsTeacherComponent } from './tests-teacher/tests-teacher.component';
import { TestsCompletedStudentComponent } from './tests-completed-student/tests-completed-student.component';
import { TestDetailsCompletedStudentComponent } from './test-details-completed-student/test-details-completed-student.component';
import { TestScoreDialogComponent } from './test-score-dialog/test-score-dialog.component';
import { TestsUncompletedStudentComponent } from './tests-uncompleted-student/tests-uncompleted-student.component';
import { TestDetailsUncompletedStudentComponent } from './test-details-uncompleted-student/test-details-uncompleted-student.component';
import { TestCompletionDialogComponent } from './test-completion-dialog/test-completion-dialog.component';
import { TestGenesisComponent } from './test-genesis/test-genesis.component';



@NgModule({
  declarations: [
                TestDetailsTeacherComponent,
                TestsTeacherComponent,
                TestsCompletedStudentComponent,
                TestDetailsCompletedStudentComponent,
                TestScoreDialogComponent,
                TestsUncompletedStudentComponent,
                TestDetailsUncompletedStudentComponent,
                TestCompletionDialogComponent,
                TestGenesisComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // This is very important for angular material dialog
  entryComponents: [
    TestScoreDialogComponent, TestCompletionDialogComponent
  ],
  exports: [
    TestDetailsTeacherComponent,
    TestsTeacherComponent,
    TestsCompletedStudentComponent,
    TestDetailsCompletedStudentComponent,
    TestScoreDialogComponent,
    TestsUncompletedStudentComponent,
    TestDetailsUncompletedStudentComponent,
    TestCompletionDialogComponent,
    TestGenesisComponent
  ]
})
export class TestsModule { }
