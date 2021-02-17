import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KstService {

  constructor(private http: HttpClient) { }

  getAllKnowledgeSpacesForCourse(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/kst/GetAllKnowledgeSpacesForCourse/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getKnowledgeSpaceById(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/kst/GetKnowledgeSpaceById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  getGraphEditDistanceById(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/kst/GetGraphEditDistanceById/${id}`).pipe(
      tap(data => {}),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    return throwError(errorMessage);
  }
}
