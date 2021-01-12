import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkDB } from 'src/app/shared/models/link';
import { NodeDB } from 'src/app/shared/models/node';

@Injectable({
  providedIn: 'root'
})
export class DagService {

  constructor(private http: HttpClient) { }





  readDag(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/get-dag/${id}`);
  }



  addNewNode(nodeDB: NodeDB): Observable<any> {
    return this.http.post('http://localhost:8000/api/create-node', nodeDB);
  }



  deleteNode(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/destroy-node/${id}`);
  }

  addNewLink(linkDB: LinkDB): Observable<any> {
    return this.http.post('http://localhost:8000/api/create-link', linkDB);
  }



}
