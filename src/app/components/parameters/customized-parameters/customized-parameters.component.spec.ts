import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizedParametersComponent } from './customized-parameters.component';



describe('ParametersComponent', () => {
  let component: CustomizedParametersComponent;
  let fixture: ComponentFixture<CustomizedParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizedParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizedParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
