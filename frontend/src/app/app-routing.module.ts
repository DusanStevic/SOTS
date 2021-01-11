import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { HomeComponent } from './home/home.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent},
  {path: 'forbidden-page', component: ForbiddenPageComponent} ,
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuard],
    data: {expectedRoles: 'TEACHER'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
