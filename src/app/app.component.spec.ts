import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SandboxService } from './sandbox.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sandboxServiceSpy: jasmine.SpyObj<SandboxService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SandboxService', ['initTestSandbox']);

    await TestBed.configureTestingModule({
      imports: [AppComponent], 
      providers: [
        { provide: SandboxService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => key === 'sandbox' ? 'test-sandbox' : null
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sandboxServiceSpy = TestBed.inject(SandboxService) as jasmine.SpyObj<SandboxService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call initTestSandbox with query param on init', () => {
    fixture.detectChanges(); 
    expect(sandboxServiceSpy.initTestSandbox).toHaveBeenCalledOnceWith('test-sandbox');
  });

  it('should NOT call initTestSandbox if query param is missing', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route as any).queryParamMap = of({
      get: (key: string) => null
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(sandboxServiceSpy.initTestSandbox).not.toHaveBeenCalled();
  });
});
