import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmpreNego';

  
  constructor(private userService: UserService){ }

  ngOnInit(){
    console.log("Bienvenido a la consola de EmpreNego");
    //this.getAllUsers();
   }
/*
   async getAllUsers(){
    await this.userService.getAll().subscribe(userList=>{
    console.log(userList);
  });
  }
*/ 
}
