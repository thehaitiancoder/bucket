import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private _http: Http) { }

  getAllUsers(): Promise<User>{
    return this._http.get('/auth/login')
    .map(response => response.json())
    .toPromise()
  }

  login(user: User): Promise<User>{
    return this._http.post('/auth/login', user)
    .map(response => response.json())
    .toPromise()
  }

  logout(): Promise<User>{
    return this._http.delete('/auth/login')
    .map(response => response.json())
    .toPromise()
  }

}
