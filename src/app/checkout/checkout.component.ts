import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

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
        userId, id: undefined
      }

      this.cartData?.forEach(element => {
        setTimeout(() => {
          element.id && this.productService.deleteCartItems(element.id!);
        }, 500);
      });

      this.productService.orderNow(orderData)
        .subscribe((result) => {
          // alert('Order Placed!!');
          this.orderMsg = "Your order has been placed!!"
          setTimeout(() => {
            this.router.navigate(['myorder'])
            this.orderMsg = undefined;
          }, 2000);
        });
    }
  }
}
