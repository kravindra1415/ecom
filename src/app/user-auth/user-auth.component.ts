import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../models/signup';
import { ProductService } from '../services/product-service.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private userService: UsersService, private productService: ProductService) { }

  ngOnInit() {
  }

  signUp(data: SignUp) {
    this.userService.userSign(data);
  }

  login(data: login) {
    this.userService.userLogin(data);
    this.userService.isValidUserAuth.subscribe((response) => {
      console.warn("apple", response);
      if (response) {
        this.authError = "please enter a valid user details.."
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    //debugger;
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product, productId: product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((response) => {
            if (response) {
              console.warn('item stored in DB..');
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      //debugger;
      console.warn(user);
      console.warn(userId);
      this.productService.getCartList(userId)
    }, 2000);
  }
}
