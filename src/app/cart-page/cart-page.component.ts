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

      console.warn(this.priceSummary);
    })
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
