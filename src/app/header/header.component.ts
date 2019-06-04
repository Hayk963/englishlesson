import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {LevelsService} from "../shared/levels.service";
import {AuthService} from "../shared/auth.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  reason;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  hide = true;
  getuser: any = [];
  flag;
  show = false;

  constructor(private userHeader: UserService,
              private levels: LevelsService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.userHeader.getUser().subscribe( (data) => {
      this.getuser = data;
    });
    this.levels.getReasons().subscribe((data) => {
      this.reason = data;
    });

  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  // ================================================================================================
  login() {
    for (let i = 0; i < this.getuser.length; i++) {
      if (this.email.value === this.getuser[i].email && this.password.value === this.getuser[i].password || this.email.value === this.userHeader.regEmail && this.password.value === this.userHeader.regPassword) {
        this.authService.login();
        this.flag = this.getuser[i].flag;
        this.data();
      }
      else {
        this.show = true;
      }
    }
  }

  // ==============================================================
  // ============================== datan tanel hom-page ============

  data() {
    this.userHeader.data(this.email.value, this.password.value).subscribe((data) => {

    });
  }

  // ======================================================================


  openDialog() {
    const dialogRef = this.dialog.open(DialogContentSignupDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-signup-dialog',
  templateUrl: 'dialog-content-signup-dialog.html',
})
export class DialogContentSignupDialog implements OnInit {
  hide = true;
  getuser: any = [];
  adduser: any = [];
  flag = [false, true, true, true, true, true, true];
  minLength = 6;

  email = new FormControl('', [Validators.required, Validators.email, this.checkAddUser.bind(this)]);
  password = new FormControl ('', [Validators.required, this.checkForLength.bind(this)]);
  FirstName = new FormControl ('', [Validators.required]);
  LastName = new FormControl ('', [Validators.required]);

  constructor(private userHeader: UserService) {}

  ngOnInit() {
    this.userHeader.getUser().subscribe( (data) => {
      this.getuser = data;
    });
  };

  checkForLength(control: FormControl){
    if(control.value.length < this.minLength && control.value.length>0)
      return {"lengthError": true};
    else
      return false;
  };


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        'emailError';
  };

  checkAddUser(control: FormControl) {
    for (let i = 0; i < this.getuser.length; i++) {
      if (control.value === this.getuser[i].email) {
        return {"emailError": true};
      }
    }
  };




      newAddUser() {
    let a = 0;
    for(let i = 0; i < this.getuser.length; i++) {
      if (this.email.value === this.getuser[i].email) {
        a++;


      }
    }
    if (a === 0 && this.email.value !== '') {
      this.userHeader.addUser(this.email.value, this.password.value, this.FirstName.value, this.LastName.value, this.flag).subscribe((result) => {
        this.adduser.push(result);
      });
    }
  }


}
