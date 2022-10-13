import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { login, SignUp } from '../models/signup';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);


  baseApiUrl = environment.baseApiURL;
  constructor(private httpClient: HttpClient, private route: Router) { }

  userSignUp(data: SignUp) {
    this.httpClient.post(this.baseApiUrl + "seller", data, { observe: 'response' }).
      subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.route.navigate(['seller-home']);

        ///console.warn('result', result)
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    console.warn(data)

    this.httpClient.get(this.baseApiUrl + "seller" + `?email=${data.email}&password=${data.password}`, { observe: 'response' }).
      subscribe((result: any) => {
        console.warn(result)
        if (result && result.body && result.body.length) {
          console.warn(result.body)
          //console.warn(result.body.length);

          console.warn("user logged in..");
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.route.navigate(['seller-home']);
        }
        else {
          console.warn("failed..");
          this.isLoginError.emit(true);
        }
      })
  }
}
