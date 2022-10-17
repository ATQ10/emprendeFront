import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.css']
})
export class MyBusinessComponent implements OnInit {
  location: string = "";
  constructor(
    private auth:AuthService
  ) {
  }

  ngOnInit(): void {
  }

  setBackground(location: string): string{
    var background = 'background-color: #224073;';
    if(this.auth.locationMenu.getValue() == location)
      return background;
    else
      return '';
  }

}
