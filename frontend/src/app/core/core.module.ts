import { NgModule, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { Optional } from '@angular/core';
import { NavbarTeacherComponent } from './navbars/navbar-teacher/navbar-teacher.component';
import { NavbarStudentComponent } from './navbars/navbar-student/navbar-student.component';



@NgModule({
  declarations: [NavbarTeacherComponent, NavbarStudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
  ],
  exports: [
    NavbarTeacherComponent, NavbarStudentComponent
 ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
