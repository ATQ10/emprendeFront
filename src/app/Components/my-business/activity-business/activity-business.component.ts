import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/service/business.service';
import { AuthService } from 'src/service/intercept/auth.service';
import { environment } from 'src/environments/environment';
import { faCirclePlus, faEdit, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { Activity } from 'src/entity/activity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from 'src/service/activity.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/service/user.service';

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
  faSortUp = faSortUp;
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
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
  }
  ngOnInit(): void {    
    Promise.resolve().then(() => this.auth.locationMenu.next("activity")); 
    
    this.userService.getByID("-1").subscribe(response=>{
      //console.log(response);
      this.idUser = response._id;

      this.activityService.getAll().subscribe(acts =>{
        this.activities = acts;
        this.getAtributoSort("estado");
      })


    });

    
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
      this.activityForm.controls.fechaInicio.setValue(activity.fechaInicio.toString().substring(0,10));
      this.activityForm.controls.fechaFinal.setValue(activity.fechaFinal.toString().substring(0,10));
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
        this.activity.creado = new Date(Date.now());
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

  delete(act: Activity){
    this.activityService.deleteActivity(act._id).subscribe(response =>{
      this.ngOnInit();
      this.toastr.success("Actividad eliminada");
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
      case "estado":
            return this.activities.sort((a, b)=> {
              if(a.estado < b.estado) { return -1; }
              if(a.estado > b.estado) { return 1; }
              return 0;
            });
        break;
      case "inicio":
            return this.activities.sort((a, b)=> {
              if(a.fechaInicio < b.fechaInicio) { return -1; }
              if(a.fechaInicio > b.fechaInicio) { return 1; }
              return 0;
            });
          break;
      case "termino":
            return this.activities.sort((a, b)=> {
              if(a.fechaInicio < b.fechaInicio) { return -1; }
              if(a.fechaInicio > b.fechaInicio) { return 1; }
              return 0;
            });
          break;
      break;
      default:
    } 
  }

}
