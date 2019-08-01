import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API : string = "http://192.168.43.219:3500/API/"
  constructor(private http : HttpClient) { }

  create(body:any) : Observable<any> {
    return this.http.post(this.API+ '/login/', body);
  }

  createuser(body:any) : Observable<any> {
    return this.http.post(this.API+ '/register/', body);
  }

  getAll() : Observable<any> {
    return this.http.get(this.API+ '/noticias/');
  }
  //// APARTADO DE LOS CREADORES DE NOTICIAS
  getMyNotices(id:string):  Observable<any> {
    return this.http.get(this.API+ '/noticias/' +id);
  }

  deleteNotice(id:string): Observable<any>{
    return this.http.delete(this.API + '/noticias/' + id);
  }

  createNew(body:any): Observable<any>{
    return this.http.post(this.API + 'noticias/',body);
  }

  updateNoticia(id:string, body:any) :  Observable<any> {
    return this.http.put(this.API+ 'noticias/' + id, body);

  }

}
