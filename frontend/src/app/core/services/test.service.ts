import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnswerEntity } from '../models/answer-model/answer.model';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    ) { }

  getAllTestsInCourseByCreator(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetAllTestsInCourseByCreator/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getTestByCreator(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetTestByCreator/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getAllCompletedTestsInCourseByExecutor(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetAllCompletedTestsInCourseByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    return throwError(errorMessage);
  }

  getAllNoCompletedTestsInCourseByExecutor(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetAllNoCompletedTestsInCourseByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getTestById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetTestById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getTestWithSameDomain(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetAllTestWithSameDomain/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  public add(id: any) {
    console.log("SERVICE")
    console.log(id)
    return this.http.post(`http://localhost:8000/api/milica`, id);
  }

  public getAnswerById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/answers/GetAnswerById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }


}
