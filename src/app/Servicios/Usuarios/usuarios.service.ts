import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rutaApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http : HttpClient) { }

  GetTodo():Observable<any[]> {
    return this.http.get<any>(rutaApi + 'users')
  }

  GetId(id : number) {
    return this.http.get<any>(rutaApi + `users/${id}`);
  }

  GetUsuariologin(user : string, pass : string) {
    return this.http.get<any>(rutaApi + `users/${user}/${pass}`);
  }

  Put(id:number|String, data:any) {
    return this.http.put(rutaApi + `users/${id}`, data);
  }

  Delete(id:number|String) {
    return this.http.delete(rutaApi + `users/${id}`);
  }

  Insert(data : any): Observable<any> {
    return this.http.post(rutaApi + 'users', data);
  }
}
