import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

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

}
