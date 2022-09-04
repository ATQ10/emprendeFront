import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idUser: string = ''): Observable<User> {
      return this.httpClient
          .get<User>(`${this.apiLink}/api/usuario/getByID/${encodeURIComponent(idUser)}`);
    }

    getAll(): Observable<User[]> {
      return this.httpClient
          .get<User[]>(`${this.apiLink}/api/usuario/getAll`);
    }

    createUser(user: User): Observable<any> {
      console.log(user)
      return this.httpClient.post<User>(`${this.apiLink}/api/usuario/create`, user);
    }

    updateClient(idUser: string = '', user: User): Observable<User> {
      return this.httpClient.put<User>(`${this.apiLink}/api/usuario/${encodeURIComponent(idUser)}`, user);
    }

    deleteClient(idUser: string = ''): Observable<User> {
      return this.httpClient.delete<User>(`${this.apiLink}/api/usuario/${encodeURIComponent(idUser)}`);
  }
}
