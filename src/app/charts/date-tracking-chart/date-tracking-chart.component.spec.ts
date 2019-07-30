import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTrackingChartComponent } from './date-tracking-chart.component';

describe('DateTrackingChartComponent', () => {
  let component: DateTrackingChartComponent;
  let fixture: ComponentFixture<DateTrackingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTrackingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTrackingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
