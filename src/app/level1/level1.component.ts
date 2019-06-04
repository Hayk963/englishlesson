import { Component, OnInit } from '@angular/core';
import {TestService} from '../shared/test.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css']
})
export class Level1Component implements OnInit {

  tester: any = [];


  id;
  audio;
  en;
  ru;
  // test1el = this.tester[0];
  // test1el1el = this.test1el[0];


  constructor( private testss: TestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.testss.getTest().subscribe((data) => {
      this.tester = data;
    });
    this.route.queryParams.subscribe( (params: Params) => {
      this.id = params['id'];
      this.audio = params['audio'];
      this.en = params['en'];
      this.ru = params['ru'];
    });
  }



}
