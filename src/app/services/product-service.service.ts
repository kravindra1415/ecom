import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cart, order, product } from '../models/signup';

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
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }

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

  getCartList(userId: number) {
    return this.httpClient.get<product[]>(this.baseApiUrl + "cart?" + "userId=" + userId,
      { observe: 'response' }).subscribe((result) => {
        //console.warn(result);
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    //return this.httpClient.delete(this.baseApiUrl + "cart/" + cartId);
    return this.httpClient.delete(this.baseApiUrl + `cart/${cartId}`);
    //`products/${id}`  
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.httpClient.get<cart[]>(this.baseApiUrl + 'cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.httpClient.post(this.baseApiUrl + 'orders', data)
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.httpClient.get<order[]>(this.baseApiUrl + 'orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.httpClient.delete(this.baseApiUrl + `cart/${cartId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([]);
        }
      });
  }

  cancelOrder(orderId: number) {
    return this.httpClient.delete(this.baseApiUrl + 'orders/' + orderId)
  }



}
