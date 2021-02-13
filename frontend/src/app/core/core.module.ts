import { NgModule, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { Optional } from '@angular/core';
import { NavbarTeacherComponent } from './navbars/navbar-teacher/navbar-teacher.component';
import { NavbarStudentComponent } from './navbars/navbar-student/navbar-student.component';
import { DagService } from './services/dag.service';
import { NavbarAdminComponent } from './navbars/navbar-admin/navbar-admin.component';
import { KstService } from './services/kst.service';




@NgModule({
  declarations: [NavbarTeacherComponent, NavbarStudentComponent, NavbarAdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService, DagService, KstService
  ],
  exports: [
    NavbarTeacherComponent, NavbarStudentComponent, NavbarAdminComponent
 ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
