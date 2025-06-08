import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SandboxService } from '../../../sandbox.service';
import { journalLogs } from '../../../models/results';

@Component({
  selector: 'app-results-logs',
  standalone: true,
  imports: [
    MatTabsModule,
    ScrollingModule,
    CommonModule
  ],
  templateUrl: './results-logs.component.html',
  styleUrl: './results-logs.component.scss'
})
export class ResultsLogsComponent {
   results$ = inject(SandboxService).results$;
   logs: journalLogs[] = []

    ngOnInit() {
      this.results$.subscribe((result) => {
        this.logs = result?.journalLogs || [];
        console.log('Logs:', this.logs);
      });
    }
}
