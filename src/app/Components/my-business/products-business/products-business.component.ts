import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-products-business',
  templateUrl: './products-business.component.html',
  styleUrls: ['./products-business.component.css']
})
export class ProductsBusinessComponent implements OnInit {

  constructor(
    private auth:AuthService
  ) {
  }
  
    ngOnInit(): void {
      this.auth.locationMenu.next("products"); 
    }

}
