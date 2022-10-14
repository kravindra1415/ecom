import { Component, OnInit } from '@angular/core';
import { SignUp } from '../models/signup';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private userAuthService: UsersService) { }

  ngOnInit() {
  }

  signUp(data: SignUp) {
    this.userAuthService.userSign(data);
  }

}
