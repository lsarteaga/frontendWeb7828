import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractsComponent } from './employee-contracts.component';

describe('EmployeeContractsComponent', () => {
  let component: EmployeeContractsComponent;
  let fixture: ComponentFixture<EmployeeContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
