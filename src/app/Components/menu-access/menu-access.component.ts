import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.css']
})
export class MenuAccessComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
