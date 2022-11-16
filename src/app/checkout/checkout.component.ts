import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  totalPrice: number | undefined;

  ngOnInit() {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach(element => {
        if (element.quantity) {
          price = price + (+element.price * +element.quantity);
        }
      });
      this.totalPrice = price;

      console.warn(this.totalPrice);
    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }
      this.productService.orderNow(orderData)
        .subscribe((result) => {
          alert('Order Placed!!');
          this.router.navigate(['myorder'])
        });
    }
  }
}
