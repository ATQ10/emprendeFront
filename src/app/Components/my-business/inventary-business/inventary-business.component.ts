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
  products: Product[] = [];
  product: Product | any;
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  productForm = new FormGroup({
    nombre: new FormControl("", [ Validators.required]),
    descripcion: new FormControl("",[ Validators.required]),
    precioCompra: new FormControl("",[Validators.required]),
    precioVenta: new FormControl("",[Validators.required]),
    stock: new FormControl("",[Validators.required]),
    minStock: new FormControl("",[Validators.required]),
    detalles: new FormControl("",[Validators.required]),
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
      this.titleModal = "Agregar un nuevo producto...";
      this.subTitleModal = "Alta de producto";
      this.productForm.controls.idN.setValue(this.idBusiness);
      this.submitButton = "Registrar";
    }
  }
  OnSubmit(){
    this.product! = this.productForm.value!;
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
      this.toastr.error("Existen campos vacios")
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
}
