import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { product } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseApiUrl = environment.baseApiURL;
  constructor(private httpClient: HttpClient) {
  }
  addProduct(data: product) {
    console.warn("service called");
    return this.httpClient.post(this.baseApiUrl + "products", data)
  }

  productList() {
    return this.httpClient.get<product[]>(this.baseApiUrl + "products")
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.baseApiUrl + `products/${id}`);
  }
}
