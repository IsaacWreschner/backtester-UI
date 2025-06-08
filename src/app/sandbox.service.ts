// src/app/store.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Parameters } from './models/parameters';
import { SandboxState, TestSandbox } from './models/sandbox';
import { Result, TestResultResponse } from './models/results';

@Injectable({
  providedIn: 'root',
})
export class SandboxService {
  public sandbox$ = new BehaviorSubject<TestSandbox>(null as any); 
  public results$ = new BehaviorSubject<Result>(null as any);
  public state$ = new BehaviorSubject<SandboxState>('NOT_DEFINED');
  public errorMsg$ = new BehaviorSubject<string>('');
  public errorHtml$ = new BehaviorSubject<string>('');
  
  constructor(private apiService: ApiService) {}

  initTestSandbox(sandboxName: string): void {
    this.apiService.getTestSandbox(sandboxName).subscribe((sandbox: TestSandbox) => {

      this.convertDatesInParameters(sandbox.parameters);
      this.sandbox$.next(sandbox);
      this.changeState('DEFINED'); 
    });
  }

  runTestSandbox(parameters: Parameters): void {
    console.log('Running test with parameters:', parameters);
    this.changeState('RUNNING'); 

    this.apiService.runTest(this.sandbox$.getValue()?.name || '', parameters).subscribe((res: TestResultResponse) => {

      this.convertDatesInParameters(res.sandbox.parameters);
      this.sandbox$.next(res.sandbox);

      this.results$.next({
        balanceChart: res.balanceChart,
        stats: res.stats,
        positionsList: res.positionsList,
        journalLogs: res.journalLog,
      }); 
      this.changeState('COMPLETED');
    }, 
    error => {
      this.handleError(error); 
     });
  }

  private changeState(newState: SandboxState): void {
    this.state$.next(newState); 
    this.resetErrorMsg(); 
  }

  private resetErrorMsg(): void {
    this.errorMsg$.next(''); 
  }


  private handleError(error: any): void {
    this.state$.next('ERROR'); 
    console.log(error)
    this.errorMsg$.next('Error: ' + error.message);
    this.errorHtml$.next('Error: ' + error.error);
  }

  private convertDatesInParameters(parameters: any): void {
    if (parameters.startDatetime) {
      parameters.startDatetime = new Date(parameters.startDatetime);
    }
    if (parameters.endDatetime) {
      parameters.endDatetime = new Date(parameters.endDatetime);
    }
  }
}
