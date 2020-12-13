import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Jwt } from './core/interceptors/jwt.interceptor';
import { KstModule } from './kst/kst.module';
import { PagesModule } from './pages/pages.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    AuthenticationModule,
    KstModule,
    PagesModule,
    NgxGraphModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 4000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: Jwt, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
