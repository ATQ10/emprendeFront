import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-activity-business',
  templateUrl: './activity-business.component.html',
  styleUrls: ['./activity-business.component.css']
})
export class ActivityBusinessComponent implements OnInit {
  idBusiness: String = "";
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private auth:AuthService
  ) {
  }
  ngOnInit(): void {    
    Promise.resolve().then(() => this.auth.locationMenu.next("activity")); 
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
