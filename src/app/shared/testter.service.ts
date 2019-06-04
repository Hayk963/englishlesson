import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestterService {

  constructor(private http: HttpClient) { }

  getTestter() {
    return this.http.get('http://localhost:3000/testter');
  }
}
