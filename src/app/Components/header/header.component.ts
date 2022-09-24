import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(
    public authService: AuthService
    ) {
     }

  ngOnInit(): void {
  }

  logOut():void{
    this.isMenuCollapsed = true;
    this.authService.logOut();
  }

}