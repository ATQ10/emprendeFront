import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/entity/user';
import { AuthService } from './intercept/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient,
    public AuthService: AuthService
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
      user.premium = false;
      return this.httpClient.post<User>(`${this.apiLink}/api/usuario/register`, user);
    }

    updateUser(idUser: string, user: User): Observable<User> {
      user.premium = this.AuthService.isPremium.getValue();
      return this.httpClient.put<User>(`${this.apiLink}/api/usuario/${encodeURIComponent(idUser)}`, user);
    }

    deleteUser(idUser: string = ''): Observable<User> {
      return this.httpClient.delete<User>(`${this.apiLink}/api/usuario/${encodeURIComponent(idUser)}`);
  }
}
