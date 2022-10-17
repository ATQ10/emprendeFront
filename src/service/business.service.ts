import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from 'src/entity/business';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idBusiness: string = ''): Observable<any> {
      return this.httpClient
          .get<Business>(`${this.apiLink}/api/negocio/getByID/${encodeURIComponent(idBusiness)}`);
    }

    getAll(): Observable<Business[]> {
      return this.httpClient
          .get<Business[]>(`${this.apiLink}/api/negocio/getAll`);
    }

    createBusiness(business: Business): Observable<any> {
      return this.httpClient.post<Business>(`${this.apiLink}/api/negocio/create`, business);
    }

    updateBusiness(idBusiness: string, business: Business): Observable<Business> {
      return this.httpClient.put<Business>(`${this.apiLink}/api/negocio/${encodeURIComponent(idBusiness)}`, business);
    }

    deleteBusiness(idBusiness: string = ''): Observable<Business> {
      return this.httpClient.delete<Business>(`${this.apiLink}/api/negocio/${encodeURIComponent(idBusiness)}`);
  }
}
