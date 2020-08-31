import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(public httpClient: HttpClient) {}

  getDeals(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/deals');
    // return this.httpClient.get('https://proyecto-javascript-8ecde.firebaseio.com/api/deals');
  }
}
