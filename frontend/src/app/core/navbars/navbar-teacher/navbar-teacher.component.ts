import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-teacher',
  templateUrl: './navbar-teacher.component.html',
  styleUrls: ['./navbar-teacher.component.scss']
})
export class NavbarTeacherComponent implements OnInit {


  constructor(private router: Router, 
    private toastr: ToastrService,
    private authService: AuthService) {
  }

  ngOnInit() {
  }


  onClickLogout(): void {
    this.authService.logout();
    this.toastr.success('Succesful logout!');
    this.router.navigate(['']);
  }

}
