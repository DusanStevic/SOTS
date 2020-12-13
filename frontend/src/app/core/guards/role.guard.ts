import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
   public auth: AuthService,
   public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string = route.data.expectedRoles;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles: string[] = expectedRoles.split('|');

    if (roles.indexOf(role) === -1) {
      this.router.navigate(['/forbidden-page']);
      return false;
    }
    return true;
}
}
