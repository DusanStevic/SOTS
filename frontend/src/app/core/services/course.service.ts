import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  // Course service for backend pagination if you do not use angular material built-in table pagination.
  getAllCoursesByUserOnePage(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/courses/GetAllCoursesByUser`, {
      params: new HttpParams()
              .set('page', pageNum.toString())
              .set('page_size', pageSize.toString())
    });
  }

  getAllCoursesByUser(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/courses/GetAllCoursesByUser`);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/courses/GetCourseById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    return throwError(errorMessage);
  }
}
