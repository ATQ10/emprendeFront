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

@Component({
  selector: 'app-inventary-business',
  templateUrl: './inventary-business.component.html',
  styleUrls: ['./inventary-business.component.css']
})
export class InventaryBusinessComponent implements OnInit {
  apiLink = environment.apiLink + "/public/"; 
  fileTmp: any;
  url: string = "";
  titleModal: string = "Agregar un nuevo producto...";
  subTitleModal: string = "Alta de producto";
  submitButton: string = "Registrar"
  idBusiness: string = "";
  faCirclePlus = faCirclePlus;
  faEdit = faEdit;
  faSortAlphaAsc = faSortAlphaAsc;
  faSortAmountAsc = faSortAmountDesc;
  products: Product[] = [];
  product: Product | any;
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  productForm = new FormGroup({
    nombre: new FormControl("", [ Validators.required]),
    descripcion: new FormControl("",[ Validators.required]),
    precioCompra: new FormControl("0"),
    precioVenta: new FormControl("0"),
    stock: new FormControl("",[Validators.required]),
    minStock: new FormControl("",[Validators.required]),
    detalles: new FormControl(""),
    idN: new FormControl("",[Validators.required]),
    _id: new FormControl(""),
    url: new FormControl(""),
    activo: new FormControl(true),
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
      Promise.resolve().then(() => this.auth.locationMenu.next("inventary"));
      this.productForm.controls.idN.disable();
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

  openXl(content: any, prod: any) {
    this.productForm.reset();
    this.url = "";
    this.modalService.open(content, { size: 'xl' });
    if(prod != 'none'){   
      this.titleModal = "Modificar un producto...";
      this.subTitleModal = "Actualización de producto";
      this.productForm.controls._id.setValue(prod._id);
      this.productForm.controls.url.setValue(prod.url);
      this.url = prod.url;
      this.productForm.controls.nombre.setValue(prod.nombre);
      this.productForm.controls.idN.setValue(prod.idN);
      this.productForm.controls.descripcion.setValue(prod.descripcion);
      this.productForm.controls.precioCompra.setValue(prod.precioCompra);
      this.productForm.controls.precioVenta.setValue(prod.precioVenta);
      this.productForm.controls.stock.setValue(prod.stock);
      this.productForm.controls.minStock.setValue(prod.minStock);
      this.productForm.controls.detalles.setValue(prod.detalles);
      this.productForm.controls.activo.setValue(prod.activo);
      this.submitButton = "Actualizar";
    }else{
      
      this.productForm.controls.precioCompra.setValue("0");
      this.productForm.controls.precioVenta.setValue("0");
      this.titleModal = "Agregar un nuevo producto...";
      this.subTitleModal = "Alta de producto";
      this.productForm.controls.idN.setValue(this.idBusiness);
      this.submitButton = "Registrar";
    }
  }
  OnSubmit(){
    console.log("this.productForm.value",this.productForm.value);
    this.product! = this.productForm.value!;
    if(this.productForm.value.precioCompra == null){
      this.product.precioCompra = 0;
    }
    if(this.productForm.value.precioVenta == null){
      this.product.precioVenta = 0;
    }
    console.log("this.productForm.controls.stock",this.productForm.controls.stock)
    if(this.productForm.valid){
      if(this.submitButton != "Registrar"){
        this.product.idN = this.idBusiness;
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
        this.product.activo = true;
        this.product.idN = this.idBusiness;
        if(this.product.precioVenta == 0 ){
          this.product.activo = false;
        }
        this.productService.createProduct(this.product!).subscribe(response=>{
          console.log(response);
          this.toastr.success("Registro exitoso");
          this.submitButton = "Actualizar";
          this.ngOnInit();
          this.productForm.reset();
          this.url = "";
          console.log(this.product)
          this.modalService.dismissAll();
        });
      }
    }else{
      this.toastr.error("Existen campos vacios o se detectaron números negativos")
    }
  }

  getFile($event:any){
    const [ file ] = $event.target.files;
    //console.log(file);
    this.fileTmp = {
      fileRaw:file,
      fileName: file.name
    };
    this.productForm.controls.imagen.setValue(this.fileTmp);
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

  deleteProduct(){
    this.product! = this.productForm.value!;
    //this.toastr.success(this.product._id);
    this.productService.deleteProduct(this.product._id).subscribe(response =>{
      console.log(response);
      this.toastr.success("Producto eliminado");
      this.modalService.dismissAll();
      this.ngOnInit();
    })
  }
}
