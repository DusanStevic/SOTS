import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KnowledgeSpace } from 'src/app/shared/models/knowledge-space';

@Injectable({
  providedIn: 'root'
})
export class DagService {

  constructor(private http: HttpClient) { }
/*   getTest(id: number): Observable<Test> {
    return this.http.get<Test>(`/api/testovi/${id}/`);
  }
  cancelTicket(id: number): Observable<any> {
    return this.http.delete(`${API_CANCEL_TICKET}/${id}`);
  } */

  readDag(id: number): Observable<any>{
    //return this.http.get<KnowledgeSpace>('http://127.0.0.1:8000/dag/' + id);
    return this.http.get(`http://127.0.0.1:8000/dag/${id}`);
  }
}