import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Test } from 'src/app/models/test';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTestsInCourseByCreator(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetAllTestsInCourseByCreator/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getTestByCreator(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetTestByCreator/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getAllCompletedTestsInCourseByExecutor(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetAllCompletedTestsInCourseByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getCompletedTestByExecutor(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetCompletedTestByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getAllUncompletedTestsInCourseByExecutor(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetAllUncompletedTestsInCourseByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getUncompletedTestByExecutor(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/tests/GetUncompletedTestByExecutor/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  createCompletedTest(testCompletion: any) {
    return this.http.post(environment.apiUrlPrefix + '/api/tests/CreateCompletedTest', testCompletion);
  }

  createTest(test: any) {
    return this.http.post(environment.apiUrlPrefix + '/api/tests/CreateTest', test);
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    return throwError(errorMessage);
  }

}
