import { Component, Inject, OnInit, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SandboxService } from '../../../sandbox.service';
import { TestSandbox } from '../../../models/sandbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-customized-parameters',
  templateUrl: './customized-parameters.component.html',
  styleUrls: ['./customized-parameters.component.scss'],
  standalone: true,
  imports: [   
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    FormsModule
  ]
})
export class CustomizedParametersComponent implements OnInit {
  dialogRef = inject(MatDialogRef<CustomizedParametersComponent>)
  sandbox$ = inject(SandboxService).sandbox$;
  parametersForm :any = {};

 

  ngOnInit(): void {
    this.sandbox$.subscribe((sandbox: TestSandbox) => {
      this.parametersForm = JSON.parse(JSON.stringify(sandbox.parameters.customParameters));
    });
  }
  
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.parametersForm);
  } 
}