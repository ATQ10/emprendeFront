import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Move } from 'src/entity/move';
import { BusinessService } from 'src/service/business.service';
import { FinanceService } from 'src/service/finance.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finance-business',
  templateUrl: './finance-business.component.html',
  styleUrls: ['./finance-business.component.css']
})
export class FinanceBusinessComponent implements OnInit {
  idBusiness: String = "";
  finances: Move[] | undefined;
  total = 0;
  egresos = 0;
  ingresos = 0; 
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private auth:AuthService,
    private financeService: FinanceService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.total = 0;
    this.egresos = 0;
    this.ingresos = 0;
    Promise.resolve().then(() => this.auth.locationMenu.next("finance"));
    this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
      }else{
        this.idBusiness = response._id;
        if(this.idBusiness!=""){
          //Cargar finanzas
          this.financeService.getAll().subscribe(moves =>{
            //console.log("Move: ",move);
            this.finances = moves;
            this.finances.forEach(move =>{
              if(move.tipo=='Compra')
                this.egresos += move.monto; 
              else if(move.tipo=='Venta')
                this.ingresos += move.monto; 
            });
            this.total = this.ingresos - this.egresos;
          })
        }
      }
    });
  }

  delete(move: Move){
    this.financeService.deleteMove(move._id).subscribe(response =>{
      this.ngOnInit();
    })
  }

}
