import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  user = new User();

  ngOnInit() {
  }

  login(){
    this._authService.login(this.user)
    .then(() => {
      this._router.navigate(['dashboard'])
    })
  }

}
