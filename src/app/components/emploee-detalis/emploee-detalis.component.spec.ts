import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploeeDetalisComponent } from './emploee-detalis.component';

describe('EmploeeDetalisComponent', () => {
  let component: EmploeeDetalisComponent;
  let fixture: ComponentFixture<EmploeeDetalisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploeeDetalisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploeeDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
