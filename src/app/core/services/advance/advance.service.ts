import { Injectable } from '@angular/core';
import { Advance } from '../../../shared/models/advance/advance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdvanceService {
  /*url = 'https://proyecto-javascript-8ecde.web.app/api/clients';
    root = 'https://proyecto-javascript-8ecde.web.app/api/';*/
  url = 'http://localhost:5000/api/advances';
  root = 'http://localhost:5000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  save(advance: Advance): Observable<any> {
    const advanceBody = JSON.stringify(advance);
    if (advance.idadvance === undefined) {
      return this.httpClient.post<Advance>(
        this.url,
        advanceBody,
        this.httpOptions
      );
    } else {
      return this.httpClient.put<Advance>(
        this.url.concat('/').concat(advance.idadvance),
        advanceBody,
        this.httpOptions
      );
    }
  }

  retrieve(id: string): Observable<Advance> {
    return this.httpClient
      .get<Advance>(this.url.concat('/').concat(id), this.httpOptions)
      .pipe(retry(1));
  }

  count(): Observable<any> {
    return this.httpClient
      .get<any>(this.root.concat('count/advances'), this.httpOptions)
      .pipe(retry(1));
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<Advance>(
      this.url.concat('/').concat(id),
      this.httpOptions
    );
  }

  list(page: number, limit: number): Observable<Advance[]> {
    return this.httpClient
      .get<Advance[]>(
        this.root.concat('page/advances/') + page + '/' + limit,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
