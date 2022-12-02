import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { User } from 'src/entity/user';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiLink = environment.apiLink;
  isLogged = new BehaviorSubject(false);  
  isPremium = new BehaviorSubject(false);  
  locationMenu = new BehaviorSubject<string>("");  

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private router: Router
    ) { 
      this.checkToken();
    }

    checkToken(){
      if(localStorage.getItem("token")){
        this.isLogged.next(true);
      }
    }

    login(user: User): Observable<any> {
      return this.httpClient.post<any>(`${this.apiLink}/api/usuario/login`, user)
      .pipe(catchError((error) => this.errorService.handleError(error)));
    }

    saveSession(token:string){
      this.isLogged.next(true);
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/');
      //console.log(token);
    }

    iAmPremium(isPremium:boolean){
      this.isPremium.next(isPremium);
      //console.log(token);
    }
  
    logOut():void{
      this.isLogged.next(false);
      this.isPremium.next(false);
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    }
}
