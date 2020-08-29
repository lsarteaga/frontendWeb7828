import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceCardComponent } from './advance-card.component';

describe('AdvanceCardComponent', () => {
  let component: AdvanceCardComponent;
  let fixture: ComponentFixture<AdvanceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
