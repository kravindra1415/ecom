import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignUp } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl = environment.baseApiURL;
  constructor(private _httpClient: HttpClient, private route: Router) { }

  userSign(user: SignUp) {
    console.warn(user);
    this._httpClient.post(this.baseApiUrl + "users", user, { observe: 'response' }).
      subscribe((response) => {
        console.warn(response);
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.route.navigate(['/'])
        }
      });
  }

  
}
