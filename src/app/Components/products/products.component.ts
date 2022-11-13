import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  apiLink = environment.apiLink + "/public/"; 
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
    private toastr: ToastrService
    ) {
    }

  async ngOnInit(): Promise<void> {
    await this.loading();
  }

  loading(){
    this.idProducto = this.rutaActiva.snapshot.params['id'];
    this.productService.getByID(this.idProducto).subscribe(response =>{
      this.product = response;
      //console.log(this.product)
      this.businessService.getByID(this.product.idN).subscribe(business =>{
        this.business = business;
        this.loadingComments();
      });
    })
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
          console.log(this.comments);
        });
      }
    });
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
      this.titleModal = "Información sobre "+this.business!.nombre;
      this.subTitleModal = this.business!.nombre;
  }

  OnSubmit(){
    this.comment! = this.commentForm!.value;
    if(this.commentForm.valid){
      this.comment.idP = this.product._id;
      this.comment.fecha = new Date(Date.now());
      this.comment.creado = new Date(Date.now());
      this.commentService.createComment(this.comment!).subscribe(response=>{
          console.log(response);
          if(response.message == "Comentario registrado"){
            this.toastr.success("Comentario publicado");
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
}
