import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  constructor() { }

  login(){
    this.isAuth = true;
  }

  logout(){
    this.isAuth = false;
  }

  isLogged(){
    return this.isAuth;
  }

}
