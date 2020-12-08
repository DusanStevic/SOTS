import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/request/login';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginSuccess: boolean = false;
  loginError: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {

    this.createForm();
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const loginInfo: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(loginInfo).subscribe(data => {
/*       localStorage.setItem(USER_ID_KEY, data.id);
      localStorage.setItem(USER_ROLE_KEY, data.authorities[0]);
      localStorage.setItem(USERNAME_KEY, data.username);
      localStorage.setItem(USER_TOKEN_KEY, data.token.accessToken); */
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('id', data.user_id);
      localStorage.setItem('groups', data.groups);

      this.loginSuccess = true;
      this.loginError = false;
      this.router.navigate(['home']);
    }, error => {
      this.loginSuccess = false;
      this.loginError = true;
      this.toastr.warning(error.error.message, 'Warning');
    });
  }

/*   onClickRegister(): void {
    this.router.navigate([REGISTRATION_PATH]);
  } */

}
