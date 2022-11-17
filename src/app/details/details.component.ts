import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../models/signup';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  productQuantity: number = 1;
  productData: product | undefined;
  removeCart = false;
  cartData: product | undefined;


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

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        //when we refresh the page cart(0), remains as it is
        //if there is 5 instead of 0 then it remain there.  
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((response) => {
          let item = response.filter((item: product) => productId === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
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
      if (!localStorage.getItem('user')) {
        console.log(this.productData);
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('user is logged in..');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        //console.warn(user);

        console.warn(userId);

        let cartData: cart = {
          ...this.productData, userId,
          productId: this.productData.id
        }

        delete cartData.id;
        console.warn(cartData);
        this.productService.addToCart(cartData).subscribe((resp̥onse) => {
          console.log("🚀 ~ file: details.component.ts ~ line 86 ~ DetailsComponent ~ this.productService.addToCart ~ resp̥onse", resp̥onse)
          if (resp̥onse) {
            //alert('product is added in cart..');
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  RemoveToCart(productId: number) {
    //debugger;
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    } else {
      console.warn(this.cartData);
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
        }
      })
      this.removeCart = false;
    }
  }
}

// removeItemFromCart(productId: number) {
//   let cartData = localStorage.getItem('localCart');
//   if (cartData) {
//     let items: product[] = JSON.parse(cartData);
//     items = items.filter((item: product) => productId !== item.id);
//     console.warn(items);
//     localStorage.setItem('localCart', JSON.stringify(items));
//     this.cartData.emit(items);
//   }
// }
