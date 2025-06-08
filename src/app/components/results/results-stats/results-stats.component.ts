import { Component } from '@angular/core';
import { AdditionalStat, Result, Stats } from '../../../models/results';
import { CommonModule } from '@angular/common';
import { SandboxService } from '../../../sandbox.service';

@Component({
  selector: 'app-results-stats',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './results-stats.component.html',
  styleUrl: './results-stats.component.scss'
})
export class ResultsStatsComponent {
  builtInStats: Stats | null = null;
  builtInStatsEntries: { name: string; value: number }[] = [];

  additionalStats: AdditionalStat[] = [];

  constructor(private sandboxService:SandboxService) {}

  ngOnInit() {
    this.sandboxService.results$.subscribe((result:Result) => {
      if (result) {
        // result.stats should contain the built-in stats
        this.builtInStats = result.stats as any as Stats;
        if (this.builtInStats) {
          this.builtInStatsEntries = this.extractBuiltInStats(this.builtInStats);
        }
        this.additionalStats = result?.additionalStats || [];
      }
    });
  }

  extractBuiltInStats(stats: Stats): { name: string; value: number }[] {
    const { ...pureStats } = stats;
    return Object.entries(pureStats).map(([key, value]) => ({
      name: this.prettifyStatName(key),
      value: value as number,
    }));
  }

  prettifyStatName(key: string): string {
    // Make camelCase nicer for table
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  getGainLossClass(value: any): string {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      if (num > 0) return 'gain';
      if (num < 0) return 'loss';
    }
    return '';
  }
}
