import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayFormComponent } from './day-form.component';

describe('DayFormComponent', () => {
  let component: DayFormComponent;
  let fixture: ComponentFixture<DayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
