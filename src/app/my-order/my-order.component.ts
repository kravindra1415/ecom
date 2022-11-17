import { Component, OnInit } from '@angular/core';
import { order } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderData: order[] | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    debugger;
    orderId && this.productService.cancelOrder(orderId).subscribe(() => {
      this.getOrderList();
    })
  }

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
}
