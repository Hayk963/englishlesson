import {Component, OnInit} from '@angular/core';
import {TestService} from '../shared/test.service';
import {Level1Component} from '../level1/level1.component';
import {MatDialog} from '@angular/material';
import {TestterService} from '../shared/testter.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {LevelsService} from "../shared/levels.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  form: FormGroup;
  showFiller = false;
  showFiller1 = false;
  test: any = [];
  testss;
  testt;
  testt1;
  ind; //index
  levles;
  selectAnswers = []; // selectAnswers
  flag = [false, true, true, true, true, true, true];
  getFlag: any = [];
  hidden = true;
  hidden1 = true;
  level;
  show = false;
  email = this.userr.email;
  password = this.userr.password;
  FirstName;
  LastName;


  constructor(private tests: TestService,
              public dialog: MatDialog,
              private testter: TestterService,
              private userr: UserService,
              // private levels: LevelsService,
              private authService: AuthService) {}

  ngOnInit() {

    this.form = new FormGroup({
      0: new FormControl(''),
      1: new FormControl(''),
      2: new FormControl(''),
      3: new FormControl(''),
      4: new FormControl(''),
      5: new FormControl(''),
      6: new FormControl(''),
      7: new FormControl(''),
      8: new FormControl(''),
      9: new FormControl(''),
    });

    this.testter.getTestter().subscribe( (data) => {
      this.testt1 = data;
    } );
    this.tests.getTest().subscribe((data) => {
      this.test = data;
    });
    this.userr.getUser().subscribe( (data) => {
      this.getFlag = data;
      this.accountContact();
    });

  }
//accountContact
  accountContact() {
    for (let i = 0; i < this.getFlag.length; i++) {
      if (this.email === this.getFlag[i].email && this.password === this.getFlag[i].password) {
        this.FirstName = this.getFlag[i].FirstName;
        this.LastName = this.getFlag[i].LastName;
        this.flag = this.getFlag[i].flag;
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  // ======= db.json lesson ==============
  //levelLessonParagraph
  masPushH(i) {
    this.testss = this.test[i];
    this.levles = i;
  }
  /////////////////////////////////////////////

  // ==============db.json test===========
  //levelTestParagraph
  masPushT(i) {
    this.testt = this.testt1[i];
    this.ind = i;
  }

  // ==================show number of level==============
  shown() {
    this.show = true;
  }
  // =========================================================
  //////////////////////////////////////////

  //   ==========  modal  ===========
  openDialog() {
    const dialogRef = this.dialog.open(Level1Component);
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
//    =================================

//  ===========radio button =====================

  massivRadio() {
    this.selectAnswers = [];
      for (let i = 0; i < this.testt.length; i++) {
          this.selectAnswers.push(this.form.get('' + i).value);
      }
      return this.selectAnswers;
  }


//  =================jisht patasxanneri stugum===========

  count = 0;
  correctAnswer;//

  //correctAnswerAmountCheck
  correctAnswerAmountCheck() {
    this.count = 0;
    this.massivRadio();
    for (let i = 0; i < this.testt.length; i++) {
      if (this.testt[i].jishtPat === this.selectAnswers[i]) {
        this.count++;
      }
      if (this.count >= 8 && this.ind < this.flag.length - 1) {
        this.flag[this.ind + 1] = false;
        this.putFlag();
      }
    }
    this.correctAnswer = "You have got " + this.count + " from 10 !";

    return this.count;
  }



  putFlag() {
    for (let i = 0; i < this.getFlag.length; i++) {
      if (this.getFlag[i].email === this.email && this.password === this.getFlag[i].password) {
        this.getFlag[i].flag = this.flag;
        this.userr.putFlag(this.getFlag[i]).subscribe();
      }
    }
  }


}

