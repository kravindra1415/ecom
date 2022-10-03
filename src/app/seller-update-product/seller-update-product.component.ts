import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productDataForUpdate: product | undefined;
  prodMessage: undefined | string;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productDataForUpdate = data;
    })
    console.warn(productId);
  }

  updateProduct(data: product) {
    console.warn(data);
    if (this.productDataForUpdate) {
      data.id = this.productDataForUpdate.id;
    }
    this.productService.updateProduct(data).subscribe((response) => {
      if (response) {
        this.prodMessage = 'Product has updated..'
      }
    });
    setTimeout(() => {
      this.prodMessage = undefined,
        this.router.navigate(['seller-home'])//page redirected after 3 seconds.
    }, 3000);
  }
}
