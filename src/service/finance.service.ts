import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Move } from 'src/entity/move';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idMove: string = ''): Observable<Move> {
      return this.httpClient
          .get<Move>(`${this.apiLink}/api/movimiento/getByID/${encodeURIComponent(idMove)}`);
    }

    getAll(): Observable<Move[]> {
      return this.httpClient
          .get<Move[]>(`${this.apiLink}/api/movimiento/getAll`);
    }

    createMove(move: Move): Observable<any> {
      return this.httpClient.post<Move>(`${this.apiLink}/api/movimiento/create`, move);
    }

    updateMove(idMove: string, move: Move): Observable<Move> {
      return this.httpClient.put<Move>(`${this.apiLink}/api/movimiento/${encodeURIComponent(idMove)}`, move);
    }

    deleteMove(idMove: string = ''): Observable<Move> {
      return this.httpClient.delete<Move>(`${this.apiLink}/api/movimiento/${encodeURIComponent(idMove)}`);
  }
}
