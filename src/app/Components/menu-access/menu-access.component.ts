import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/intercept/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.css']
})
export class MenuAccessComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLogged.getValue()){
      this.userService.getByID("-1").subscribe(user=>{
        this.authService.iAmPremium(user.premium);
      });
    }
  }

}
