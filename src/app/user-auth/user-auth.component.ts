import { Component, OnInit } from '@angular/core';
import { login, SignUp } from '../models/signup';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private userService: UsersService) { }

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
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;

  }

}
