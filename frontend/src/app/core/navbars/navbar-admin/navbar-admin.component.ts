import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
  }

  ngOnInit() {
  }


  onClickLogout(): void {
    this.authService.logout();
    this.toastr.success('Logout successful!');
    this.router.navigate(['']);
  }

  onTitleClick(): void {
    this.router.navigate(['']);
  }

}
