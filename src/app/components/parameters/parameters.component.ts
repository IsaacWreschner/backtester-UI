import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Parameters } from '../../models/parameters';
import { MatDialog } from '@angular/material/dialog';
import { CustomizedParametersComponent } from './customized-parameters/customized-parameters.component';
import { TestSandbox } from '../../models/sandbox';
import { SandboxService } from '../../sandbox.service';

@Component({
  selector: 'app-parameters', 
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParametersComponent {
  parameters!: Parameters; // Store parameters
  sandbox!: TestSandbox; // Store sandbox
  symbols: any[] = [];
  timeframes: any[] = []; 
 

  constructor(
    private sandboxService: SandboxService,
    public dialog: MatDialog ) {
    
  }

  ngOnInit() {
    this.sandboxService.sandbox$.subscribe((sandbox: TestSandbox) => {
      console.log(sandbox); // Log sandbox to the console
      this.sandbox = sandbox; // Update sandbox from the store
      this.symbols = sandbox?.supportedSymbols; // Update symbols from the store
      this.timeframes = sandbox?.supportedTimeframes; // Update timeframes from the store
      this.parameters = sandbox?.parameters; // Update parameters from the store
    });
  }

  submitForm() {
    this.sandboxService.runTestSandbox(this.parameters);
  }

  openCustomParameters(): void {
    const dialogRef = this.dialog.open(CustomizedParametersComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.parameters.customParameters = result; 
      }
    });
  }
}
