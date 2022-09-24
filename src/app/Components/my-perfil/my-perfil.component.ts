import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent implements OnInit {
  idUser: string | undefined;
  usuario: User | any;
  userForm = new FormGroup({
  email: new FormControl("",[ Validators.email ]),
  password: new FormControl("",[ Validators.required ]),
  passwordConfirm: new FormControl("",[ Validators.required ]),
  nombre: new FormControl("", [ Validators.required]),
  apellido: new FormControl("",[ Validators.required]),
  telefono: new FormControl("",[Validators.required]),
});

constructor(
  private userService: UserService,
  private toastr: ToastrService
) { }

  ngOnInit(): void {
    this.userService.getByID("-1").subscribe(response=>{
      //console.log(response);
      this.userForm.controls.apellido.setValue(response.apellido);
      this.userForm.controls.nombre.setValue(response.nombre);
      this.userForm.controls.email.setValue(response.email);
      this.userForm.controls.telefono.setValue(response.telefono);
      this.idUser = response._id;
    });
  }

  OnSubmit():void{
    this.usuario! = this.userForm.value!;
    if(this.usuario!.password != this.userForm.value.passwordConfirm){
      this.toastr.error("Las contraseñas no coinciden");
    }else{
      this.userService.updateUser(this.idUser!,this.usuario!).subscribe(response=>{
        console.log(response);
        this.toastr.success("Actualización exitosa")
      });
    }
  }

}
