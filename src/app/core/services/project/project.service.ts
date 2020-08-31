import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Project } from '../../../shared/models/project/project';
import { Contract } from '../../../shared/models/contract/contract';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  /*url = 'https://proyecto-javascript-8ecde.web.app/api/projects';
  root = 'https://proyecto-javascript-8ecde.web.app/api/';*/

  url = 'http://localhost:5000/api/projects';
  root = 'http://localhost:5000/api/';
  root2 = 'http://localhost:5000/api/contract/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  save(project: Project): Observable<any> {
    const projectBody = JSON.stringify(project);
    if (project.idproject === undefined) {
      return this.http.post<Project>(this.url, projectBody, this.httpOptions);
    } else {
      return this.http.put<Project>(
        this.url.concat('/').concat(project.idproject),
        projectBody,
        this.httpOptions
      );
    }
  }

  retrieve(id: string): Observable<Project> {
    return this.http
      .get<Project>(this.url.concat('/').concat(id), this.httpOptions)
      .pipe(retry(1));
  }

  count(): Observable<any> {
    return this.http
      .get<any>(this.root.concat('count/projects'), this.httpOptions)
      .pipe(retry(1));
  }

  delete(id: string): Observable<any> {
    return this.http.delete<Project>(
      this.url.concat('/').concat(id),
      this.httpOptions
    );
  }

  list(page: number, limit: number): Observable<Project[]> {
    return this.http
      .get<Project[]>(
        this.root.concat('page/projects/') + page + '/' + limit,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  list2(page: number, limit: number, id: string): Observable<Project[]> {
    return this.http
      .get<Project[]>(
        this.root2.concat('projects/') + id + '/' + page + '/' + limit,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  count2(id: string): Observable<any> {
    return this.http
      .get<any>(this.root2.concat('count/projects/') + id, this.httpOptions)
      .pipe(retry(1));
  }
}
