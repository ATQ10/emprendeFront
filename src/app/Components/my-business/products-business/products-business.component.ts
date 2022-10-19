import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-products-business',
  templateUrl: './products-business.component.html',
  styleUrls: ['./products-business.component.css']
})
export class ProductsBusinessComponent implements OnInit {
  idBusiness: String = "";
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private auth:AuthService
  ) {
  }
  ngOnInit(): void {    
    Promise.resolve().then(() => this.auth.locationMenu.next("products")); 
    this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
      }else{
        this.idBusiness = response._id;
        if(this.idBusiness!=""){
          
        }
      }
    });
  }

}
