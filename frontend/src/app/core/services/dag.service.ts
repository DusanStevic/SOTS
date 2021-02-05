import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkDB } from 'src/app/shared/models/link';
import { NodeDB } from 'src/app/shared/models/node';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DagService {

  constructor(private http: HttpClient) { }





  readDag(id: number): Observable<any> {
    return this.http.get(environment.apiUrlPrefix + `/api/get-dag/${id}`);
  }



  addNewNode(nodeDB: NodeDB): Observable<any> {
    return this.http.post(environment.apiUrlPrefix + '/api/create-node', nodeDB);
  }



  deleteNode(id: number): Observable<any> {
    return this.http.delete(environment.apiUrlPrefix + `/api/destroy-node/${id}`);
  }

  addNewLink(linkDB: LinkDB): Observable<any> {
    return this.http.post(environment.apiUrlPrefix + '/api/create-link', linkDB);
  }



}
