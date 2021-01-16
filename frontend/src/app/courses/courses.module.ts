import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CourseDetailsComponent } from './course-details/course-details.component';




@NgModule({
  declarations: [CoursesComponent, CourseDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CoursesComponent, CourseDetailsComponent
  ]
})
export class CoursesModule { }
