import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsLogsComponent } from './results-logs.component';

describe('ResultsLogsComponent', () => {
  let component: ResultsLogsComponent;
  let fixture: ComponentFixture<ResultsLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
