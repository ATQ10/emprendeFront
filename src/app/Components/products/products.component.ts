import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/entity/product';
import { Comment } from 'src/entity/comment';
import { ProductService } from 'src/service/product.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Business } from 'src/entity/business';
import { BusinessService } from 'src/service/business.service';
import { CommetnService } from 'src/service/commetn.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/service/user.service';
import { User } from 'src/entity/user';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  apiLink = environment.apiLink + "/public/"; 
  errorToast = true;
  message: string = ""
  faDeleteLeft = faDeleteLeft;
  faEdit = faEdit;
  myThumbnail="{{apiLink+}}";
  myFullresImage="";
  idProducto: string = '';
  product: Product | any;
  titleModal: string = "";
  subTitleModal: String = "";
  idBusiness: string = "";
  business: Business | undefined;
  comment: Comment | any;
  comments: any[] = [];
  users: User[] = [];
  idUser: string = "";
  userContact: User | undefined;
  userOwner: User | undefined;
  editComment = false;
  idCommentEdit = "";
  commentForm = new FormGroup({
    idU: new FormControl(""),
    idP: new FormControl(""),
    mensaje: new FormControl("",[ Validators.required]),
    fecha: new FormControl(""),
    creado: new FormControl("")
  });
  constructor(
    private rutaActiva: ActivatedRoute,
    private productService: ProductService,
    private businessService: BusinessService,
    private commentService: CommetnService,
    private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location
    ) {
      
      this.ngOnInit()
    }

  async ngOnInit(): Promise<void> {
    await this.loading();
  }

  loading(){
    this.editComment = false;
    this.idProducto = this.rutaActiva.snapshot.params['id'];
    this.productService.getByID(this.idProducto).subscribe(response =>{
      this.product = response;
      //console.log(this.product)
      this.businessService.getByID(this.product.idN).subscribe(business =>{
        this.business = business;
        //user Owner
        this.userService.getByID(this.business?.idU).subscribe(userOwner=>{
          this.userOwner = userOwner;
        });
        this.loadingComments();
      });
    },error =>{
      if(error.error.message == "No tenemos este producto" && this.errorToast == true){
        this.errorToast = false;
        this.toastr.warning("Este producto está inhabilitado");
        this._location.back();
      }
    })
    
    this.userService.getByID("-1").subscribe(response=>{
      //console.log(response);
      if(response != undefined){
        this.userContact = response;
        this.idUser = response._id; 
      }    

    });
  }

  loadingComments(){
    this.commentService.getAll(this.idProducto).subscribe(comments =>{
      //this.comments = comments;
      //console.table(this.comments);
      if(comments.length!=0){
        this.userService.getAll().subscribe(users =>{
          //console.log(users);
          for(let i = 0; i<comments.length; i++){
            for(let j = 0; j<users.length; j++){
              if(users[j]._id == comments[i].idU){
                Object.defineProperty(comments[i], 'usuario', { value: users[j]});
                break;
              }
            }
          }
          this.comments = comments;
          //console.log(this.comments);
          //Conocer usuario logueado
        });
      }
    });
  }

  openXl(content: any) {
    this.editComment = false;
    this.commentForm.controls.mensaje.setValue("");
    this.modalService.open(content, { size: 'xl' });
      this.titleModal = "Información sobre "+this.business!.nombre;
      this.subTitleModal = this.business!.nombre;
  }

  openXlComment(content: any) {
    this.editComment = false;
    //console.log(this.userContact)
    if(this.userContact?.nombre != undefined){
      this.message = "Estimad@ propietario de " + this.business?.nombre + ", es de mi interés ("+this.userContact?.nombre + " "+
                    this.userContact?.apellido+") contactarle por este medio"+
                    " para poder adquirir el producto que usted tiene publicado en la plataforma Emprenego, este producto es:"+
                    " * "+this.product.nombre + " *";
      this.commentForm.controls.mensaje.setValue(this.message);
      this.modalService.open(content, { size: 'xl' });
    }else{
      this.toastr.error("Primero debes iniciar sesión");
    }
  }

  moreInfo(content: any) {
    this.editComment = false;
    this.modalService.dismissAll();
    this.modalService.open(content, { size: 'xl' });
      this.titleModal = "Información sobre propietario de "+this.business!.nombre;
      this.subTitleModal = "Propietario: ";
  }

  OnSubmit(){
    this.comment! = this.commentForm!.value;
    if(this.commentForm.valid){
      if(this.editComment){
        this.comment._id = this.idCommentEdit;
        this.commentService.updateComment(this.comment._id,this.comment).subscribe(response=>{
          if(response != undefined){
            this.toastr.success("Comentario editado");
            this.ngOnInit();
            this.commentForm.reset();
            this.modalService.dismissAll();
          }
        });
        this.editComment = false;
      }else{
        this.comment.idP = this.product._id;
        this.comment.fecha = new Date(Date.now());
        this.comment.creado = new Date(Date.now());
        this.commentService.createComment(this.comment!).subscribe(response=>{
            //console.log(response);
            if(response.message == "Comentario registrado"){
              this.toastr.success("Comentario publicado");
              this.ngOnInit();
              this.commentForm.reset();
              this.modalService.dismissAll();
            }else{
              this.toastr.error("Primero debes iniciar sesión");
            }
            
          });
      }
      
    }else{
      this.toastr.error("Existen campos vacios")
    }
  }

  OnSubmitEmail(){
    this.comment! = this.commentForm!.value;
    if(this.commentForm.valid){
      this.comment.mensaje+="\n\nDATOS DE CONTACTO:\n";
      this.comment.mensaje+=" * Nombre: "+this.userContact?.nombre +" "+this.userContact?.apellido+"\n";
      this.comment.mensaje+=" * Email: "+this.userContact?.email+"\n";
      if(this.userContact!.telefono!.toString()!="")
        this.comment.mensaje+=" * Tel.: "+this.userContact?.telefono+"\n";
      this.comment.idP = this.product._id;
      this.comment.fecha = new Date(Date.now());
      this.comment.creado = new Date(Date.now());
      //console.log(this.comment!,this.userOwner!.email)
      this.commentService.sendEmail(this.comment!,this.userOwner!.email).subscribe(response=>{
          //console.log(response);
          if(response.message == "Mensaje enviado correctamente"){
            let closeButton = this.toastr.toastrConfig.closeButton;
            let disableTimeOut = this.toastr.toastrConfig.disableTimeOut;
            let positionClass = this.toastr.toastrConfig.positionClass;
            this.toastr.toastrConfig.closeButton = true;
            this.toastr.toastrConfig.disableTimeOut = true;
            this.toastr.toastrConfig.positionClass = 'toast-center-center';
            this.toastr.success(response.message + "\n Revisa constantemente tu email, en breve el propietario se pondra en contacto contigo.");
            this.toastr.toastrConfig.closeButton = closeButton;
            this.toastr.toastrConfig.disableTimeOut = disableTimeOut;
            this.toastr.toastrConfig.positionClass = positionClass;
            this.ngOnInit();
            this.commentForm.reset();
            this.modalService.dismissAll();
          }else{
            this.toastr.error("Primero debes iniciar sesión");
          }
          
        });
    }else{
      this.toastr.error("Existen campos vacios")
    }
  }

  delete(idComment: string):void{
    this.commentService.deleteComment(idComment).subscribe(response=>{
      this.toastr.success("Comentario eliminado");
      this.loadingComments();
    });
  }

  otrosProductos(){
    //this.toastr.success(this.business?._id)
    this.router.navigate(['/allBusiness/'+this.business?._id]);
    this.modalService.dismissAll();
  }

  edit(comment: Comment, content: any){
    this.idCommentEdit = comment._id;
    this.editComment = true;
    this.commentForm.controls.creado.setValue(comment.creado.toString());
    this.commentForm.controls.fecha.setValue(comment.fecha.toString());
    this.commentForm.controls.mensaje.setValue(comment.mensaje);
    this.commentForm.controls.idP.setValue(comment.idP);
    this.commentForm.controls.idU.setValue(comment.idU);
    this.modalService.open(content, { size: 'xl' });
  }

}
