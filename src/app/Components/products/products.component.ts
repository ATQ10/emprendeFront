import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/entity/product';
import { ProductService } from 'src/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  apiLink = environment.apiLink + "/public/"; 
  idProducto: string = '';
  product: Product | any;
  constructor(
    private rutaActiva: ActivatedRoute,
    private productService: ProductService
    ) { 
      this.product = {
        nombre: ""
      };
    }
  

  modalEmp(){
    
  }

  async ngOnInit(): Promise<void> {
    await this.loading();
  }

  loading(){
    this.idProducto = this.rutaActiva.snapshot.params['id'];
    this.productService.getByID(this.idProducto).subscribe(response =>{
      this.product = response;
      console.log(this.product)
    })
  }

}
