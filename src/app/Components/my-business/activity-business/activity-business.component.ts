import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { environment } from 'src/environments/environment';
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Activity } from 'src/entity/activity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from 'src/service/activity.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity-business',
  templateUrl: './activity-business.component.html',
  styleUrls: ['./activity-business.component.css']
})
export class ActivityBusinessComponent implements OnInit {
  idBusiness: string = "";
  idUser: string = "";
  apiLink = environment.apiLink + "/public/"; 
  fileTmp: any;
  url: string = "";
  titleModal: string = "Agregar una nueva actividad...";
  subTitleModal: string = "Nueva de actividad";
  submitButton: string = "Guardar"
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  activities: Activity[] = [];
  activity: Activity | any;
  activityForm = new FormGroup({
    tarea: new FormControl("", [ Validators.required]),
    fechaInicio: new FormControl("",[ Validators.required]),
    fechaFinal: new FormControl("",[Validators.required]),
    estado: new FormControl("Pendiente",[Validators.required]),
    idU: new FormControl("",[Validators.required]),
    _id: new FormControl(""),
    creado: new FormControl("")
  });
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private auth:AuthService,
    private activityService: ActivityService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
  }
  ngOnInit(): void {    
    Promise.resolve().then(() => this.auth.locationMenu.next("activity")); 
    /*
    this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
      }else{
        this.idBusiness = response._id;
        if(this.idBusiness!=""){
          
        }
      }
    });
    */
    
  }

  openXl(content: any, activity: any) {
    this.activityForm.reset();
    this.modalService.open(content, { size: 'xl' });
    if(activity != 'none'){   
      this.titleModal = "Modificar una actividad...";
      this.subTitleModal = "Actualización de actividad";
      this.activityForm.controls._id.setValue(activity._id);
      this.activityForm.controls.tarea.setValue(activity.tarea);
      this.activityForm.controls.idU.setValue(activity.idU);
      this.activityForm.controls.fechaInicio.setValue(activity.fechaInicio);
      this.activityForm.controls.fechaFinal.setValue(activity.fechaFinal);
      this.activityForm.controls.estado.setValue(activity.estado);
      this.activityForm.controls.creado.setValue(activity.creado);
      this.submitButton = "Actualizar";
    }else{
      this.titleModal = "Agregar una nueva actividad...";
      this.subTitleModal = "Nueva actividad";
      this.activityForm.controls.idU.setValue(this.idUser);
      this.activityForm.controls.estado.setValue("Pendiente");
      this.submitButton = "Guardar";
    }
  }

  OnSubmit(){
    this.activity! = this.activityForm.value!;
    if(this.activityForm.valid){
      if(this.submitButton != "Guardar"){
        this.activity.idU = this.idUser;
        this.activityService.updateActivity(this.activity._id,this.activity!).subscribe(response=>{
          //console.log(response);
          this.toastr.success("Actualización exitosa");
          this.ngOnInit();
          this.activityForm.reset();
          //console.log(this.product)
          this.modalService.dismissAll();
        });
      }else{
        this.activity.idN = this.idUser;
        this.activityService.createActivity(this.activity!).subscribe(response=>{
          console.log(response);
          this.toastr.success("Registro exitoso");
          this.submitButton = "Actualizar";
          this.ngOnInit();
          this.activityForm.reset();
          this.url = "";
          console.log(this.activity)
          this.modalService.dismissAll();
        });
      }
    }else{
      this.toastr.error("Existen campos vacios")
    }
  }

}
