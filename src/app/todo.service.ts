import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl='http://localhost:3000/task';
  constructor(private httpClient: HttpClient) {}
    
  //create post request
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    // we are sending http post request to server
    //response in a observable
       return this.httpClient.post(API_URL,data);
  }

  list(){
    return this.httpClient.get(this.apiUrl);
  }

  update(id: any, data: any):Observable<any>{
    let API_URL=`${this.apiUrl}/${id}`;
    return this.httpClient.put(API_URL,data);
  }

  deleteTodo(id:any):Observable<any>{
    let API_URL=`${this.apiUrl}/${id}`;
    return this.httpClient.delete(API_URL);
  }


}
