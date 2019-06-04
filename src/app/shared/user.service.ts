import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  FirstName;
  LastName;
  email;
  password;
  regEmail;
  regPassword;


  //data()
  data(email, password) {
    this.email = email;
    this.password = password;
    return this.http.get('http://localhost:3000/user/');
  }



  // flag: any = [];
  // flag1: any = [];

  // loginFlag(flag) {
  //   this.flag = flag;
  //   return this.http.get('http://localhost:3000/user/');
  // }

  putFlag(users) {
    return this.http.put('http://localhost:3000/user/' + users.id, users);
  }

  getUser() {
    return this.http.get('http://localhost:3000/user');
  }
  addUser(email, password, FirstName, LastName, flag) {
    this.regEmail = email;
    this.regPassword = password;
    let users = {
      "FirstName": FirstName,
      "LastName": LastName,
      "email": email,
      "password": password,
      "flag": flag
    };
    return this.http.post('http://localhost:3000/user', users);
  }
}
