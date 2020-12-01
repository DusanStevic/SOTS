import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from 'src/app/shared/models/request/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers(): void {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      this.toastr.error(error);
    });
  }

}
