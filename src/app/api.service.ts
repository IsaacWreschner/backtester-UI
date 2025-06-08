import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parameters } from './models/parameters';
import { TestSandbox } from './models/sandbox';

@Injectable({
  providedIn: 'root',

})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; // Flask back-end URL
  constructor(private http: HttpClient) {}

  getTestSandbox(sandboxName:string): Observable<TestSandbox> {
    return this.http.get(`${this.apiUrl}/${sandboxName}/metadata`) as Observable<TestSandbox>;
  }

  runTest(sandboxName:string, parameters: Parameters): Observable<any> {
    return this.http.post(`${this.apiUrl}/${sandboxName}/run`, parameters);
  }
}