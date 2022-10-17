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
      return this.httpClient.post<Product>(`${this.apiLink}/api/producto/create`, Product);
    }

    updateProduct(idProduct: string, Product: Product): Observable<Product> {
      return this.httpClient.put<Product>(`${this.apiLink}/api/producto/${encodeURIComponent(idProduct)}`, Product);
    }

    deleteProduct(idProduct: string = ''): Observable<Product> {
      return this.httpClient.delete<Product>(`${this.apiLink}/api/producto/${encodeURIComponent(idProduct)}`);
  }
}
