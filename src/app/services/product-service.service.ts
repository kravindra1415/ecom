import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cart, product } from '../models/signup';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  baseApiUrl = environment.baseApiURL;
  constructor(private httpClient: HttpClient) {
  }

  addProduct(data: product) {
    console.warn("service called");
    return this.httpClient.post(this.baseApiUrl + "products", data);
  }

  productList() {
    return this.httpClient.get<product[]>(this.baseApiUrl + "products")
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.baseApiUrl + `products/${id}`);
  }

  getProduct(id: string) {
    return this.httpClient.get<product>(this.baseApiUrl + `products/${id}`)
  }

  updateProduct(product: product) {
    return this.httpClient.put<product>(this.baseApiUrl + `products/${product.id}`, product);
  }

  popularProducts() {
    return this.httpClient.get<product[]>(this.baseApiUrl + `products?_limit=3`);
  }

  trendyProducts() {
    return this.httpClient.get<product[]>(this.baseApiUrl + `products?_limit=8`);
  }

  searchProduct(query: string) {
    return this.httpClient.get<product[]>(this.baseApiUrl + `products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.httpClient.post(this.baseApiUrl + "cart", cartData);
  }
}
