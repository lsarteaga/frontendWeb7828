import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
url: string = 'https://proyecto-javascript-8ecde.web.app/api/employees';
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  
  save(employee: Employee): Observable<any>  {
    let employeeBody = JSON.stringify(employee);
    if(employee.idemployee === undefined){
      return this.http.post<Employee>(this.url, employeeBody, this.httpOptions);
    }
    else{
      return this.http.put<Employee>(this.url.concat('/').concat(employee.idemployee), employeeBody, this.httpOptions);
    }
  }

  retrieve(id: string): Observable<Employee>  {
    return this.http.get<Employee>(this.url.concat('/').concat(id), this.httpOptions)
      .pipe(
        retry(1)
      );
  }


  count(): Observable<any>  {
    return this.http.get<any>('https://proyecto-javascript-8ecde.web.app/api/count/employees', this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(id: string): Observable<any>  {
    return this.http.delete<Employee>(this.url.concat('/').concat(id), this.httpOptions);
  }

  list(page: number, limit : number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/' + page + '/' + limit, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
}
