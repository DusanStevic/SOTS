
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from 'src/app/shared/models/request/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private http: HttpClient) {
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }
  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(loginInfo: Login): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token-auth/', loginInfo);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://127.0.0.1:8000/api/users/');
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
  //PREBACI SE NA VELIKA SLOVA ZBOG KONSTANTI
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

  }
}
