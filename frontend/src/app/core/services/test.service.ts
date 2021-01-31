import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AnswerEntity } from '../models/answer.model';
import { ChoseAnswerEntity } from '../models/chose_answer.model';
import { HttpHeaders } from '@angular/common/http';


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

  getTestByExecutor(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tests/GetCompletedTestByExecutor/${id}`).pipe(
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


  add(id: any) {
    console.log("SERVICE")
    console.log(id)
    return this.http.post(`http://localhost:8000/api/choseAnswers/CreateChoseAnswer`, id);
  }

  getAnswerById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/answers/GetAnswerById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true'});

  addM(domainDTO: any): Observable<any> {
    console.log("CAO")
    console.log(domainDTO)
		let domainUrl =  "http://localhost:8080/api/choseAnswers/CreateChoseAnswer";
		return this.http.post(domainUrl, {answer: domainDTO}, {headers: this.headers, responseType: 'text'});
  }


}
