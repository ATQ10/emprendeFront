import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Business } from 'src/entity/business';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css']
})
export class RegisterBusinessComponent implements OnInit {
  changeImagen = true;
  apiLink = environment.apiLink + "/public/"; 
  fileTmp: any;
  url: string = "";
  idBusiness: string | undefined;
  business: Business | any;
  submitButton: string = "Registrar"
  businessForm = new FormGroup({
  nombre: new FormControl("", [ Validators.required]),
  descripcion: new FormControl("",[ Validators.required]),
  sede: new FormControl("",[Validators.required]),
  inicioFecha: new FormControl("",[Validators.required]),
  idU: new FormControl(""),
  _id: new FormControl(""),
  url: new FormControl(""),
  imagen: new FormControl(
    {
      fileRaw: "",
      fileName: ""
    }),
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
        this.changeImagen = true;
      }else{
        this.submitButton = "Actualizar";
        this.changeImagen = false;
        this.businessForm.controls._id.setValue(response._id);
        this.businessForm.controls.idU.setValue(response.idU);
        this.businessForm.controls.nombre.setValue(response.nombre);
        this.businessForm.controls.sede.setValue(response.sede);
        this.businessForm.controls.descripcion.setValue(response.descripcion);
        this.businessForm.controls.inicioFecha.setValue(response.inicioFecha.substring(0, 10));
        this.url = response.url;
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
          this.ngOnInit();
        });
      }else{
        this.businessService.createBusiness(this.business!).subscribe(response=>{
          console.log(response);
          this.toastr.success("Registro exitoso");
          this.submitButton = "Actualizar";
          this.ngOnInit();
        });
      }
    }else{
      this.toastr.error("Existen campos vacios")
    }
  }
  getFile($event:any){
    const [ file ] = $event.target.files;
    //console.log(file);
    this.fileTmp = {
      fileRaw:file,
      fileName: file.name
    };
    this.businessForm.controls.imagen.setValue(this.fileTmp);
  }

  deleteBusiness(){
    this.businessService.deleteBusiness(this.idBusiness).subscribe((response:any)=>{
      console.log(response);
      if(response['message'] != 'Negocio eliminado'){
        this.toastr.warning(response['message']);
      }else{
        this.toastr.success(response['message']);
        this.businessForm.reset();
        this.url = "";
      }
    })
  }
}
