import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SandboxService } from './sandbox.service';
import { ActivatedRoute } from '@angular/router'; // <-- Import this
import { ParametersComponent } from './components/parameters/parameters.component';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
      CommonModule,
      HttpClientModule,
      ParametersComponent,
      ResultsComponent
    ],
  styleUrls: ['./app.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  route = inject(ActivatedRoute); // <-- Use inject to get the route
  sandboxService = inject(SandboxService); // <-- Use inject to get the service

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const sandboxName = params.get('sandbox');
      if (sandboxName) {
        this.sandboxService.initTestSandbox(sandboxName); 
      }
    });
  }
}
