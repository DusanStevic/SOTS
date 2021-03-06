
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }


  login(loginInfo: Login): Observable<any> {
    return this.http.post(environment.apiUrlPrefix + '/api/token-auth/', loginInfo);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrlPrefix + '/api/users/');
  }

  isTeacherLoggedIn() {
    return localStorage.getItem('role') === 'TEACHER';
  }

  isStudentLoggedIn(): boolean {
    return localStorage.getItem('role') === 'STUDENT';
  }

  isAdminLoggedIn(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  /* checkForAdmin(): boolean {
    return localStorage.getItem(USER_ROLE_KEY) === 'ROLE_ADMIN';
  }



  addNewUser(userInfo: UserRegistrationData): Observable<any> {
    return this.http.post(API_REGISTER_USER, userInfo);
  }

  activateAccount(confirmationToken: string): Observable<any> {
    return this.http.get(`${API_VERIFY_ACCOUNT}/${confirmationToken}`);
  } */
  getToken(): string {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

  }
}
