import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';



@NgModule({
  declarations: [ForbiddenPageComponent, NotFoundPageComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
