import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuscriptionE } from 'src/entity/suscription';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { SuscriptionService } from 'src/service/suscription.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-premium-business',
  templateUrl: './premium-business.component.html',
  styleUrls: ['./premium-business.component.css']
})
export class PremiumBusinessComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  idBusiness: String = "";
  suscriptions: SuscriptionE[];
  constructor(
    private businessService: BusinessService,
    private router: Router,
    public auth:AuthService,
    private suscriptionService: SuscriptionService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
    this.suscriptions = [];
  }
  ngOnInit(): void {    
    Promise.resolve().then(() => this.auth.locationMenu.next("premium")); 
    this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
      }else{
        this.idBusiness = response._id;
        if(this.idBusiness!=""){
          this.suscriptionService.getAll().subscribe(suscriptios=>{
            this.suscriptions = suscriptios;
            this.orderByDate();
            console.table(this.suscriptions);
          });
        }
      }
    });
  }

  orderByDate(){
    return this.suscriptions.sort((a, b)=> {
      if(a.fechaFinal < b.fechaFinal) { return 1; }
      if(a.fechaFinal > b.fechaFinal) { return -1; }
      return 0;
    });
  }

  openXl(content: any) {
    this.ngOnInit();
    if(this.suscriptions.length==0){
      this.toastr.warning("No tienes historial de suscripciones");
      return;
    }
    this.modalService.open(content, { size: 'md' });
    console.log(this.auth.isPremium.getValue());
  }

}
