import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [TestsComponent, TestDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TestsComponent, TestDetailsComponent
  ]
})
export class TestsModule { }
