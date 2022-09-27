import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { isEmpty } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    usuario: User | any;
    userForm = new FormGroup({
    nombre: new FormControl("", [ Validators.required]),
    apellido: new FormControl("",[ Validators.required]),
    telefono: new FormControl(""),
    email: new FormControl("",[ Validators.email ]),
    password: new FormControl("",[ Validators.required ]),
    passwordConfirm: new FormControl("",[ Validators.required ]),
    
  });

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  OnSubmit():void{
    this.usuario! = this.userForm.value!;
    if( !this.userForm.valid || 
      this.usuario.nombre.trim()=="" || 
      this.usuario.apellido.trim()==""
      )
      this.toastr.error("Existen campos vacíos"); 
    else{
      if(this.usuario!.password != this.userForm.value.passwordConfirm){
        this.toastr.error("Las contraseñas no coinciden");
      }else{
        console.log(this.usuario); 
        
        this.userService.createUser(this.usuario!)
          .subscribe(
            response=>{console.log(response);
              this.toastr.success("Usuario creado exitosamente");
              this.router.navigate(['\login']); 
          });
             
      }
     
    }
   
}
}