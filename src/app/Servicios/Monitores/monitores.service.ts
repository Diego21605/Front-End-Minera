import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rutaApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoresService {
  
  constructor(private http : HttpClient) { }

  GetTodo():Observable<any[]> {
    return this.http.get<any>(rutaApi + 'monitors')
  }

  GetId(id : number) {
    return this.http.get<any>(rutaApi + `monitors/${id}`);
  }

  Put(id:number|String, data:any) {
    return this.http.put(rutaApi + `monitors/${id}`, data);
  }

  Delete(id:number|String) {
    return this.http.delete(rutaApi + `monitors/${id}`);
  }

  Insert(data : any): Observable<any> {
    return this.http.post(rutaApi + 'monitors', data);
  }
}
