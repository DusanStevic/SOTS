import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests/tests.component';
import { TestDetailsComponent } from './test-details/test-details.component';



@NgModule({
  declarations: [TestsComponent, TestDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TestsComponent, TestDetailsComponent
  ]
})
export class TestsModule { }
