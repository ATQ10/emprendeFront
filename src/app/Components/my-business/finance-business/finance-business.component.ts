import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Move } from 'src/entity/move';
import { BusinessService } from 'src/service/business.service';
import { FinanceService } from 'src/service/finance.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faCirclePlus, faEdit, faSortAlphaAsc, faSortAmountDesc, faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-finance-business',
  templateUrl: './finance-business.component.html',
  styleUrls: ['./finance-business.component.css']
})
export class FinanceBusinessComponent implements OnInit {
  idBusiness: String = "";
  finances: Move[] = [];
  total = 0;
  egresos = 0;
  ingresos = 0; 
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  faSortAlphaAsc = faSortAlphaAsc;
  faSortAmountAsc = faSortAmountDesc;
  faSortUp = faSortUp;
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
      this.toastr.success("Movimiento eliminado");
    })
  }

  reduceText(text: String): String{
    if(text.length>70){
      return text.substring(0,67) + "...";
    }else{
      return text;
    }
  }

  getAtributoSort(atributo:String): any{
    //Ordenamos pokemosn por ID
    console.log(atributo);
    switch(atributo){
      case "descripcion":
            return this.finances.sort((a, b)=> {
              if(a.descripcion < b.descripcion) { return -1; }
              if(a.descripcion > b.descripcion) { return 1; }
              return 0;
            });
        break;
      case "monto":
            return this.finances.sort((a, b)=> {
              if(a.monto < b.monto) { return -1; }
              if(a.monto > b.monto) { return 1; }
              return 0;
            });
          break;
      case "fecha":
            return this.finances.sort((a, b)=> {
              if(a.fecha < b.fecha) { return -1; }
              if(a.fecha > b.fecha) { return 1; }
              return 0;
            });
          break;
      break;
      default:
    } 
  }

}
