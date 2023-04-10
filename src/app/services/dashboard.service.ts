import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly url:string = environment.api;

  constructor(private http: HttpClient) { }

  getAllRecords():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/all-records`);
  }

  getSelling():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/selling`);
  }

  getQualification():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/high-qualification`);
  }

  getTotal():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/sum-values`);
  }

  getAllBrands():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/all-brands`);
  }

  getAllSellByBrands():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/sell-by-brand`);
  }

  getBestBrands():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/best-brands`);
  }

  getPriceBestBrands():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/price-best-brands`);
  }

  getPriceSize():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/price-x-size`);
  }

  getUpdateRate():Observable<any>{
    return this.http.get<any>(`${this.url}data/monitors/update-rate`);
  }

}
