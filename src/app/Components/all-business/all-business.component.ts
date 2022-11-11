import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/entity/product';
import { ProductService } from 'src/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-business',
  templateUrl: './all-business.component.html',
  styleUrls: ['./all-business.component.css']
})
export class AllBusinessComponent implements OnInit {
  apiLink = environment.apiLink + "/public/"; 
  products: Product[] = [];
  searchForm = new FormGroup({
    search: new FormControl("")
  });
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.searchForm.controls.search.setValue("");
    this.productService.getAll("*-1").subscribe(products => {
      //console.log(products);
      this.products = products;
      console.log(this.products);
      if(this.products.length == 0){
        this.toastr.warning("No existen coincidencias")
      }else{
        
      }
    });
  }

  OnSubmit(): void {
    var buscar = this.searchForm.controls.search.value;
    buscar = buscar!.trim();
    console.log(buscar);
    this.productService.getAll("*-1"+buscar).subscribe(products => {
      //console.log(products);
      this.products = products;
      console.log(this.products);
      if(this.products.length == 0){
        this.toastr.warning("No existen coincidencias")
      }else{
        
      }
    });
  }

  reduceText(text: String): String{
    if(text.length>70){
      return text.substring(0,67) + "...";
    }else{
      return text;
    }
  }

}
