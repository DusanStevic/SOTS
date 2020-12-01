
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/models/request/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  /* checkForAdmin(): boolean {
    return localStorage.getItem(USER_ROLE_KEY) === 'ROLE_ADMIN';
  }

  logout(): void {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USER_TOKEN_KEY);
  }

  addNewUser(userInfo: UserRegistrationData): Observable<any> {
    return this.http.post(API_REGISTER_USER, userInfo);
  }

  activateAccount(confirmationToken: string): Observable<any> {
    return this.http.get(`${API_VERIFY_ACCOUNT}/${confirmationToken}`);
  } */
}
