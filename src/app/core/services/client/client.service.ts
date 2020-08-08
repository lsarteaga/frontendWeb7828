import { Injectable } from '@angular/core'
import {Client} from '../../../shared/models/client/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = 'https://proyecto-javascript-8ecde.web.app/api/clients';
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  save(client: Client): Observable<any>  {
    let clientBody = JSON.stringify(client);
    if(client.idclient === undefined){
      return this.http.post<Client>(this.url, clientBody, this.httpOptions);
    }
    else{
      return this.http.put<Client>(this.url.concat('/').concat(client.idclient), clientBody, this.httpOptions);
    }
  }

  retrieve(id: string): Observable<Client>  {
    return this.http.get<Client>(this.url.concat('/').concat(id), this.httpOptions)
      .pipe(
        retry(1)
      );
  }


  count(): Observable<any>  {
    return this.http.get<any>('https://proyecto-javascript-8ecde.web.app/api/count/clients', this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(id: string): Observable<any>  {
    return this.http.delete<Client>(this.url.concat('/').concat(id), this.httpOptions);
  }

  list(page: number, limit : number): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/' + page + '/' + limit, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}
