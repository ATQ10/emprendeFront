import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SuscriptionE } from 'src/entity/suscription';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idSuscriptionE: string = ''): Observable<SuscriptionE> {
      return this.httpClient
          .get<SuscriptionE>(`${this.apiLink}/api/suscripcion/getByID/${encodeURIComponent(idSuscriptionE)}`);
    }

    getAll(): Observable<SuscriptionE[]> {
      return this.httpClient
          .get<SuscriptionE[]>(`${this.apiLink}/api/suscripcion/getAll`);
    }

    createSuscriptionE(suscriptionE: any): Observable<any> {
      return this.httpClient.post<SuscriptionE>(`${this.apiLink}/api/suscripcion/create`, suscriptionE);
    }

    updateSuscriptionE(idSuscriptionE: string, suscriptionE: SuscriptionE): Observable<SuscriptionE> {
      return this.httpClient.put<SuscriptionE>(`${this.apiLink}/api/suscripcion/${encodeURIComponent(idSuscriptionE)}`, suscriptionE);
    }

    deleteSuscriptionE(idSuscriptionE: string = ''): Observable<SuscriptionE> {
      return this.httpClient.delete<SuscriptionE>(`${this.apiLink}/api/suscripcion/${encodeURIComponent(idSuscriptionE)}`);
  }
}

