import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { login, SignUp } from '../models/signup';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  isValidUserAuth = new EventEmitter<boolean>(false);
  baseApiUrl = environment.baseApiURL;
  constructor(private _httpClient: HttpClient, private router: Router) { }

  userSign(user: SignUp) {
    console.warn(user);
    this._httpClient.post(this.baseApiUrl + "users", user, { observe: 'response' }).
      subscribe((response) => {
        console.warn(response);
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.router.navigate(['/'])
        }
      });
  }

  userLogin(data: login) {
    console.warn(data)

    this._httpClient.get<SignUp[]>(this.baseApiUrl + "users" + `?email=${data.email}&password=${data.password}`, { observe: 'response' }).
      subscribe((result: any) => {
        console.warn(result)
        if (result && result.body && result.body.length) {
          this.isValidUserAuth.emit(false);
          console.warn(result.body)
          //console.warn(result.body.length);

          console.warn("user logged in..");
          localStorage.setItem('user', JSON.stringify(result.body[0]))
          this.router.navigate(['/']);
        }
        else {
          console.warn("failed..");
          this.isValidUserAuth.emit(true);
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
