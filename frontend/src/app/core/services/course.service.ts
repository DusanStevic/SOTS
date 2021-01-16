import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCoursesByUserOnePage(pageNum: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/courses/GetAllCoursesByUser/`, {
      params: new HttpParams()
              .set('page', pageNum.toString())
    });
  }

  getAllCoursesByUser(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/courses/GetAllCoursesByUser`);
  }
}
