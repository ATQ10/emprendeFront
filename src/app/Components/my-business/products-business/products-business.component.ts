import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from 'src/service/business.service';
import { ProductService } from 'src/service/product.service';
import { faCirclePlus, faEdit, faSortAlphaAsc, faSortAmountDesc, faSortNumericDesc } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/entity/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/service/intercept/auth.service';
import { environment } from 'src/environments/environment';
import { Move } from 'src/entity/move';
import { FinanceService } from 'src/service/finance.service';
import { ParseFlags } from '@angular/compiler';
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
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  faSortAlphaAsc = faSortAlphaAsc;
  faSortAmountAsc = faSortAmountDesc;  products: Product[] = [];
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
    private financeService: FinanceService,
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
            this.getAtributoSort("nombre");
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
        let closeButton = this.toastr.toastrConfig.closeButton;
        let disableTimeOut = this.toastr.toastrConfig.disableTimeOut;
        let positionClass = this.toastr.toastrConfig.positionClass;
        this.toastr.toastrConfig.closeButton = true;
        this.toastr.toastrConfig.disableTimeOut = true;
        this.toastr.toastrConfig.positionClass = 'toast-center-center';
        this.toastr.warning("No olvides actualizar tu inventario con los articulos que utilizaste para preparar este producto");
        
        this.toastr.toastrConfig.closeButton = closeButton;
        this.toastr.toastrConfig.disableTimeOut = disableTimeOut;
        this.toastr.toastrConfig.positionClass = positionClass;
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
        //Create a Finance
        if(this.productForm.controls.total.value! > 0){
          console.log("New finance")
          let move = {
            descripcion: "",
            monto: this.productForm.controls.total.value!,
            tipo: "",
            idU: "", 
            fecha: new Date(Date.now()), 
            creado: new Date(Date.now())
          };
          console.log("move",move)
          if(this.isVenta){
            move.descripcion = "Venta de ";
            move.tipo = "Venta";
            this.toastr.success("Venta exitosa");
          }
          else{
            move.descripcion = "Compra de ";
            move.tipo = "Compra";
            this.toastr.success("Compra exitosa");
          }
          
          move.descripcion += this.productForm.controls.cantidad.value! + " " + this.productForm.controls.nombre.value!;
          this.financeService.createMove(move).subscribe(financeResponse => {
            console.log("Nueva finanza:", financeResponse);
          });
        }
        
        //console.log(response);
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

  reduceText(text: String): String{
    if(text.length>70){
      return text.substring(0,67) + "...";
    }else{
      return text;
    }
  }

  getAtributoSort(atributo:String): any{
    //Ordenamos pokemosn por ID
    console.log(atributo);
    switch(atributo){
      case "nombre":
            return this.products.sort((a, b)=> {
              if(a.nombre < b.nombre) { return -1; }
              if(a.nombre > b.nombre) { return 1; }
              return 0;
            });
        break;
      case "stock":
            return this.products.sort((a, b)=> {
              if(a.stock < b.stock) { return -1; }
              if(a.stock > b.stock) { return 1; }
              return 0;
            });
          break;
      case "minStock":
            return this.products.sort((a, b)=> {
              if(a.minStock < b.minStock) { return -1; }
              if(a.minStock > b.minStock) { return 1; }
              return 0;
            });
          break;
      case "precioCompra":
        return this.products.sort((a, b)=> {
          if(a.precioCompra < b.precioCompra) { return -1; }
          if(a.precioCompra > b.precioCompra) { return 1; }
          return 0;
        });
      break;
      case "precioVenta":
        return this.products.sort((a, b)=> {
          if(a.precioVenta < b.precioVenta) { return -1; }
          if(a.precioVenta > b.precioVenta) { return 1; }
          return 0;
        });
      break;
      default:
    } 
  }
}
