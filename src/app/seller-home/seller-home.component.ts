import { Component, OnInit } from '@angular/core';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: product[] | undefined;
  productMessage: undefined | string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.productList().subscribe((response) => {
      console.warn(response);
      this.productList = response;
    })
  }

  deleteProduct(id: number) {
    console.warn('id', id);

    this.productService.deleteProduct(id).subscribe((response) => {
      if (response) {
        this.productMessage = "Product is deleted.."
        this.listProducts();
      }
    })

    setTimeout(() => {
      this.productMessage = undefined;
    }, 2000);
  }

}
