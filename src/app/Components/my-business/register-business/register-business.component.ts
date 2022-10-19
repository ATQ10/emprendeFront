import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Business } from 'src/entity/business';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css']
})
export class RegisterBusinessComponent implements OnInit {
  idBusiness: string | undefined;
  business: Business | any;
  submitButton: string = "Registrar"
  businessForm = new FormGroup({
  nombre: new FormControl("", [ Validators.required]),
  descripcion: new FormControl("",[ Validators.required]),
  sede: new FormControl("",[Validators.required]),
  inicioFecha: new FormControl("",[Validators.required]),
});

constructor(
  private businessService: BusinessService,
  private toastr: ToastrService,
  private auth:AuthService
) {
}

  ngOnInit(): void {
    Promise.resolve().then(() => this.auth.locationMenu.next("register")); 
    this.businessService.getByID("-1").subscribe(response=>{
      //console.log(response);
      if(response.message == "No tenemos este negocio"){
        this.toastr.warning("Registra un negocio")
      }else{
        this.submitButton = "Actualizar";
        this.businessForm.controls.nombre.setValue(response.nombre);
        this.businessForm.controls.sede.setValue(response.sede);
        this.businessForm.controls.descripcion.setValue(response.descripcion);
        this.businessForm.controls.inicioFecha.setValue(response.inicioFecha.substring(0, 10));
        this.idBusiness = response._id;
      }
    });
  }

  OnSubmit():void{
    this.business! = this.businessForm.value!;
    if(this.businessForm.valid){
      if(this.submitButton != "Registrar"){
        this.businessService.updateBusiness(this.idBusiness!,this.business!).subscribe(response=>{
          console.log(response);
          this.toastr.success("Actualización exitosa");
        });
      }else{
        this.businessService.createBusiness(this.business!).subscribe(response=>{
          console.log(response);
          this.toastr.success("Registro exitoso");
          this.submitButton = "Actualizar";
        });
      }
    }else{
      this.toastr.error("Existen campos vacios")
    }
  }
}
