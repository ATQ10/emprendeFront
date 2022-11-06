import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/service/business.service';
import { ProductService } from 'src/service/product.service';
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/entity/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/service/intercept/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-products-business',
  templateUrl: './products-business.component.html',
  styleUrls: ['./products-business.component.css']
})
export class ProductsBusinessComponent implements OnInit {
  isVenta: boolean = true;
  apiLink = environment.apiLink + "/public/"; 
  url: string = "";
  titleModal: string = "";
  subTitleModal: string = "";
  submitButton: string = ""
  idBusiness: string = "";
  faEdit = faEdit;
  products: Product[] = [];
  product: Product | any;
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  productForm = new FormGroup({
    nombre: new FormControl("", [ Validators.required]),
    descripcion: new FormControl("",[ Validators.required]),
    precioCompra: new FormControl("",[Validators.required]),
    precioVenta: new FormControl("",[Validators.required]),
    stock: new FormControl(""),
    minStock: new FormControl("",[Validators.required]),
    detalles: new FormControl("",[Validators.required]),
    idN: new FormControl("",[Validators.required]),
    _id: new FormControl(""),
    url: new FormControl(""),
    activo: new FormControl(true),
    cantidad: new FormControl(1,[Validators.required]),
    total: new FormControl(0,[Validators.required]),
    imagen: new FormControl(
      {
        fileRaw: "",
        fileName: ""
      }),
  });

  constructor(
    private businessService: BusinessService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private auth:AuthService
  ) {
  }
    ngOnInit(): void {
      Promise.resolve().then(() => this.auth.locationMenu.next("products"));
      this.businessService.getByID("-1").subscribe(response=>{
      if(response.message == "No tenemos este negocio"){
        this.router.navigate(['myBusiness']);
      }else{
        this.idBusiness = response._id;
        this.productForm.controls.idN.setValue(this.idBusiness);
        if(this.idBusiness!=""){
          this.productService.getAll(this.idBusiness!).subscribe(products => {
            //console.log(products);
            this.products = products;
            if(this.products.length == 0){
              this.toastr.warning("No tienes productos")
            }else{
              
            }
          });
        }
      }
    });
  }

  openXl(content: any, prod: any, type: any) {
    if(type=='Venta' || type=='Utilización'){
      this.isVenta = true
    }else{
      if(type=='Preparación'){
        this.toastr.toastrConfig.closeButton = true;
        this.toastr.toastrConfig.disableTimeOut = true;
        this.toastr.toastrConfig.positionClass = 'toast-center-center';
        this.toastr.warning("No olvides actualizar tu inventario con los articulos que utilizaste para preparar este producto");
      }
      this.isVenta = false
    }
    this.submitButton = "Concretar " + type;
    this.productForm.reset();
    this.url = "";
    this.modalService.open(content, { size: 'xl' });
    if(prod != 'none'){   
      this.product = prod;
      this.titleModal = type+" de un producto ("+prod.nombre+")";
      this.subTitleModal = type + " de " + prod.nombre;
      this.productForm.controls._id.setValue(prod._id);
      this.productForm.controls.url.setValue(prod.url);
      this.url = prod.url;
      this.productForm.controls.nombre.setValue(prod.nombre);
      this.productForm.controls.idN.setValue(prod.idN);
      this.productForm.controls.descripcion.setValue(prod.descripcion);
      this.productForm.controls.precioCompra.setValue(prod.precioCompra);
      this.productForm.controls.precioVenta.setValue(prod.precioVenta);
      this.productForm.controls.stock.setValue(prod.stock);
      this.productForm.controls.activo.setValue(prod.activo);
      if(prod.stock>0){
        this.productForm.controls.cantidad.setValue(1);
        if(this.isVenta){
          this.productForm.controls.total.setValue(prod.precioVenta);
        }else{
          this.productForm.controls.total.setValue(prod.precioCompra);
        }
      }
      this.productForm.controls.minStock.setValue(prod.minStock);
      this.productForm.controls.detalles.setValue(prod.detalles);
    }else{
      this.productForm.controls.idN.setValue(this.idBusiness);
    }
  }

  OnChange(){
    if(this.isVenta){
      this.productForm.controls.total.setValue(
        this.productForm.controls.cantidad.value! * parseFloat(this.productForm.controls.precioVenta.value!)
        );
    }else{
      this.productForm.controls.total.setValue(
        this.productForm.controls.cantidad.value! * parseFloat(this.productForm.controls.precioCompra.value!)
        );
    }
  }
  OnSubmit(){
    this.product! = this.productForm.value!;
    if((parseInt(this.productForm.controls.stock.value!)<this.productForm.controls.cantidad.value!
    ||1>this.productForm.controls.cantidad.value!) && this.isVenta){
      this.toastr.error("Cantidad no válida")
      return;
    }
    if(!this.isVenta && this.productForm.controls.cantidad.value!<1){
      this.toastr.error("Cantidad no válida")
      return;
    }
    if(this.productForm.valid){
      if(this.isVenta){
        this.product.stock = parseInt(this.productForm.controls.stock.value!) - this.productForm.controls.cantidad.value!
        //parseFloat(this.productForm.controls.precioVenta.value!)
      }else{
        this.product.stock = parseInt(this.productForm.controls.stock.value!) + this.productForm.controls.cantidad.value!
        //parseFloat(this.productForm.controls.precioCompra.value!)
      }
      this.product.idN = this.idBusiness;
      console.log(this.product)
      this.productService.updateProduct(this.product._id,this.product!).subscribe(response=>{
        //console.log(response);
        this.toastr.success("Actualización exitosa");
        this.ngOnInit();
        this.productForm.reset();
        this.url = "";
        //console.log(this.product)
        this.modalService.dismissAll();
      });
    }else{
      this.toastr.error("Especifique una cantidad")
    }
  }

  setActivo(prod: Product){
    console.log(prod);
    this.productService.updateProduct(prod._id,prod).subscribe(response=>{
      //console.log(response);
      if(prod.activo)
        this.toastr.success("Producto habilitado");
      else
        this.toastr.warning("Producto inhabilitado");
      this.ngOnInit();
      this.productForm.reset();
      this.url = "";
      //console.log(this.product)
      this.modalService.dismissAll();
    });
  }

  getBackground(prod: Product): string{
    if(prod.minStock>prod.stock)
      return 'background-color: rgb(229 63 63 / 32%)'
    else
      return ''
  }
}
