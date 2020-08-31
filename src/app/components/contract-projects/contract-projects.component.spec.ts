import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractProjectsComponent } from './contract-projects.component';

describe('ContractProjectsComponent', () => {
  let component: ContractProjectsComponent;
  let fixture: ComponentFixture<ContractProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
