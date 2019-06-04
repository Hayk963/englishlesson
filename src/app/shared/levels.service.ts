import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient) { }


  getReasons(){
    return this.http.get("http://localhost:3000/reasons")
  }
}
