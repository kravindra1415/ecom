import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../models/signup';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-selling-auth',
  templateUrl: './selling-auth.component.html',
  styleUrls: ['./selling-auth.component.css']
})

export class SellingAuthComponent implements OnInit {
  authError = '';
  showLogin = false;

  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.sellerService.userSignUp(data)
    //this.router.navigate(['seller-home'])
    //console.log(response)
  }

  login(data: login): void {
    this.authError = "";
    this.sellerService.userLogin(data);
    console.log(data);
    this.sellerService.isLoginError.subscribe((error) => {
      if (error) {
        this.authError = "Email or Password is not correct.."
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  passwordVisibility() {
    alert()
  }

  // signUp(data: SignUp): void {
  //   this.sellerService.userSignUp(data).subscribe((response) => {
  //     if (response) {
  //       this.router.navigate(['seller-home'])
  //     }
  //     console.log(response)
  //   })
  // }
}
