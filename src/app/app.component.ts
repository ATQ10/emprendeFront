import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emprendeFront';

  
  constructor(private userService: UserService){ }

  ngOnInit(){
    console.log("Hola");
    this.getAllUsers();
   }

   async getAllUsers(){
    await this.userService.getAll().subscribe(userList=>{
    console.log(userList);
  });
  }
  
}
