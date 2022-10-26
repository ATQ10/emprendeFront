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
      const body = new FormData();
      body.append('descripcion',business.descripcion);
      body.append('idU',business.idU);
      body.append('inicioFecha',business.inicioFecha.toString());
      body.append('nombre',business.nombre);
      body.append('sede',business.sede);
      if(business.imagen!=null)
        body.append('imagen',business.imagen.fileRaw, business.imagen.fileName);
      return this.httpClient.post<Business>(`${this.apiLink}/api/negocio/create`, body);
    }

    updateBusiness(idBusiness: string, business: Business): Observable<Business> {
      console.log(business);
      const body = new FormData();
      body.append('_id',business._id);
      body.append('descripcion',business.descripcion);
      body.append('idU',business.idU);
      body.append('inicioFecha',business.inicioFecha.toString());
      body.append('nombre',business.nombre);
      body.append('sede',business.sede);
      if(business.imagen.fileName!="")
        body.append('imagen',business.imagen.fileRaw, business.imagen.fileName);
      return this.httpClient.put<Business>(`${this.apiLink}/api/negocio/${encodeURIComponent(idBusiness)}`, body);
    }

    deleteBusiness(idBusiness: string = ''): Observable<Business> {
      return this.httpClient.delete<Business>(`${this.apiLink}/api/negocio/${encodeURIComponent(idBusiness)}`);
    }
}
