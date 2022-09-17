import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: any;
  userForm = new FormGroup({
  email: new FormControl("",[ Validators.email ]),
  password: new FormControl("",[ Validators.required ]),
  passwordConfirm: new FormControl(""),
  nombre: new FormControl(""),
  apellido: new FormControl(""),
  telefono: new FormControl(""),
});
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  OnSubmit():void{
    this.usuario! = this.userForm.value!;
    this.authService.login(this.usuario!).subscribe(response=>{
      this.toastr.success(response.message);
      try {
        this.authService.saveSession(response.accessToken);
      } catch (error) {
        console.log("Error")
      }
    });
  }
}
