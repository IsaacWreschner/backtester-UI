import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SandboxService } from '../../../sandbox.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Position } from '../../../models/results';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [ MatTableModule, DatePipe, CommonModule, ScrollingModule],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsListComponent {
  positions: Position[] = [];

  constructor(private sandbox: SandboxService) {}

  ngOnInit() {
    this.sandbox.results$.subscribe((result) => {
      console.log('Result:', result);
      this.positions = result?.positionsList || [];
    });
  }

  
  getProfitClass(position: any): string {
    const profit = position.profit;
    if (profit > 0) return 'profit-positive';
    if (profit < 0) return 'profit-negative';
    return 'profit-neutral';
  }
}
