import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResultsChartComponent } from './results-chart/results-chart.component';
import { ResultsStatsComponent } from './results-stats/results-stats.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { SandboxService } from '../../sandbox.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ResultsLogsComponent } from './results-logs/results-logs.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ 
    CommonModule,
    AsyncPipe,
    NgIf,
    MatTabsModule,
    MatProgressSpinnerModule,
    ResultsChartComponent,
    ResultsStatsComponent,
    ResultsListComponent,
    ResultsLogsComponent
   ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
    sandboxService = inject(SandboxService);

    state$ = this.sandboxService.state$;
    errorMsg$ = this.sandboxService.errorMsg$;
    errorHtml$ = this.sandboxService.errorHtml$;
    ngOnInit() {}
}
