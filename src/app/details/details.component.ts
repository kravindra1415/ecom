import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  productQuantity: number = 1;
  productData: undefined | product;
  removeCart = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.productService.getProduct(productId).subscribe((response) => {
      console.warn(response);
      this.productData = response;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  // AddToCart() {
  //   if (this.productData) {
  //     this.productData.quantity = this.productQuantity;
  //     if (! localStorage.getItem('user')) {
  //       console.warn(this.productData);
  //       this.productService.localAddToCart(this.productData);
  //     }
  //     else{

  //     }
  //   }
  // }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (localStorage.getItem('user')) {
        console.log(this.productData);
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('else');
      }
    }
  }

  RemoveToCart(productId: number) {
    this.productService.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
