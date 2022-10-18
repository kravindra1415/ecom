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
  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  signUp(data: SignUp) {
    this.userService.userSign(data);
  }

  login(data: login) {

  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;

  }

}
