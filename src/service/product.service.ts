import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/entity/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiLink = environment.apiLink;
  constructor(
    private httpClient: HttpClient
    ) { }

    getByID(idProduct: string = ''): Observable<any> {
      return this.httpClient
          .get<Product>(`${this.apiLink}/api/producto/getByID/${encodeURIComponent(idProduct)}`);
    }

    getAll(idBusiness: string = ''): Observable<Product[]> {
        return this.httpClient
          .get<Product[]>(`${this.apiLink}/api/producto/getAll/${encodeURIComponent(idBusiness)}`);
    }

    createProduct(Product: Product): Observable<any> {
      const body = new FormData();
      body.append('descripcion',Product.descripcion);
      body.append('detalles',Product.detalles);
      body.append('idN',Product.idN);
      body.append('minStock',Product.minStock.toString());
      body.append('nombre',Product.nombre);
      body.append('precioCompra',Product.precioCompra.toString());
      body.append('stock',Product.stock.toString());
      body.append('precioVenta',Product.precioVenta.toString());
      body.append('activo',Product.activo.toString());
      if(Product.imagen!=null)
        body.append('imagen',Product.imagen.fileRaw, Product.imagen.fileName);

      //console.log("body",body.getAll("imagen"));
      //console.log("Product",Product);
      return this.httpClient.post<Product>(`${this.apiLink}/api/producto/create`, body);
    }

    updateProduct(idProduct: string, Product: Product): Observable<Product> {
      const body = new FormData();
      body.append('_id',Product._id);
      body.append('descripcion',Product.descripcion);
      body.append('detalles',Product.detalles);
      body.append('idN',Product.idN);
      body.append('minStock',Product.minStock.toString());
      //body.append('creado',Product.creado.toString());
      body.append('nombre',Product.nombre);
      body.append('precioCompra',Product.precioCompra.toString());
      body.append('stock',Product.stock.toString());
      body.append('precioVenta',Product.precioVenta.toString());
      body.append('activo',Product.activo.toString());
      if(Product.imagen!=null)
        body.append('imagen',Product.imagen.fileRaw, Product.imagen.fileName);

      //console.log("body",body.getAll("imagen"));
      //console.log("Product",Product);
      return this.httpClient.put<Product>(`${this.apiLink}/api/producto/${encodeURIComponent(idProduct)}`, body);
    }

    deleteProduct(idProduct: string = ''): Observable<Product> {
      return this.httpClient.delete<Product>(`${this.apiLink}/api/producto/${encodeURIComponent(idProduct)}`);
  }
}
