import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.productService.removeToCart(cartId).subscribe((result) => {
      // if (result) {
      //   let user = localStorage.getItem('user');
      //   let userId = user && JSON.parse(user).id;
      //   this.productService.getCartList(userId);
      // }
      alert()
      this.loadDetails();
    })
  }

  loadDetails() {
    this.productService.currentCart().subscribe((result) => {
      console.warn(result);
      this.cartData = result;
      let price = 0;
      result.forEach(element => {
        if (element.quantity) {
          price = price + (+element.price * +element.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 100);

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }

      console.warn(this.priceSummary);
    })
  }

  reload() {
    location.reload();
  }
}
