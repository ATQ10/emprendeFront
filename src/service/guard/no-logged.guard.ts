import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../intercept/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
    ){};

canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 if(this.auth!.isLogged.getValue()){
   return true;
 }else{
  this.toastr.warning("Debes iniciar sesión");
   this.router.navigate(['login']);
   return false;
 }
}

}
