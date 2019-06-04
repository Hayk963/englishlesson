import { Component, OnInit } from '@angular/core';
import {TestterService} from '../shared/testter.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testt: any = [];

  constructor(private testter: TestterService) { }



  ngOnInit() {
    this.testter.getTestter().subscribe( (data) => {
      this.testt = data;
      console.log(this.testt);
    } );
  }

}





