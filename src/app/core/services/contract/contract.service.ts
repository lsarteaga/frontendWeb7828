import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contract } from '../../../shared/models/contract/contract';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  /*url = 'https://proyecto-javascript-8ecde.web.app/api/clients';
  root = 'https://proyecto-javascript-8ecde.web.app/api/';*/
  url = 'https://proyecto-javascript-8ecde.web.app/api/contracts';
  root = 'https://proyecto-javascript-8ecde.web.app/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  save(contract: Contract): Observable<any> {
    const contractBody = JSON.stringify(contract);
    if (contract.idcontract === undefined) {
      return this.httpClient.post<Contract>(
        this.url,
        contractBody,
        this.httpOptions
      );
    } else {
      return this.httpClient.put<Contract>(
        this.url.concat('/').concat(contract.idcontract),
        contractBody,
        this.httpOptions
      );
    }
  }

  retrieve(id: string): Observable<Contract> {
    return this.httpClient
      .get<Contract>(this.url.concat('/').concat(id), this.httpOptions)
      .pipe(retry(1));
  }

  count(): Observable<any> {
    return this.httpClient
      .get<any>(this.root.concat('count/contracts'), this.httpOptions)
      .pipe(retry(1));
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<Contract>(
      this.url.concat('/').concat(id),
      this.httpOptions
    );
  }

  list(page: number, limit: number): Observable<Contract[]> {
    return this.httpClient
      .get<Contract[]>(
        this.root.concat('page/contracts/') + page + '/' + limit,
        this.httpOptions
      )
      .pipe(retry(1));
  }
}
