import { Component } from '@angular/core';
import { chartData } from '../../../models/results';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SandboxService } from '../../../sandbox.service';

@Component({
  selector: 'app-results-chart',
  standalone: true,
  imports: [
    NgxChartsModule,
    CommonModule
  ],
  templateUrl: './results-chart.component.html',
  styleUrl: './results-chart.component.scss'
})
export class ResultsChartComponent {
  chartData: chartData[] = [];
  formattedChartData: any[] = [];

  colorScheme = '#5AA454';

  constructor(private sandbox: SandboxService) {}

  ngOnInit() {
    this.sandbox.results$.subscribe((result) => {
      this.chartData = result?.balanceChart || [];
      this.formattedChartData = [
        {
          name: 'Balance',
          series: this.chartData.map(d => ({
            name: new Date(d.date).toLocaleDateString(),
            value: d.balance,
          })),
        }
      ];
      console.log('Formatted Chart Data:', this.formattedChartData);
    });
  }
}
