import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/intercept/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.css']
})
export class MyBusinessComponent implements OnInit {
  location: string = "";
  constructor(
    private auth:AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if(this.auth.isLogged.getValue()){
      this.userService.getByID("-1").subscribe(user=>{
        this.auth.iAmPremium(user.premium);
      });
    }
  }

  setBackground(location: string): string{
    var background = 'background-color: #224073;';
    if(this.auth.locationMenu.getValue() == location)
      return background;
    else
      return '';
  }

}
