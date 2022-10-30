import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessService } from '../business.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  constructor(
    private router: Router,
    private businessService: BusinessService,
) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve) => {
    this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
        resolve(false)
      }else{
        resolve(true)
      }
    });
  });
  }
  
}
