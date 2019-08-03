import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalChartComponent } from './goal-chart.component';

describe('GoalChartComponent', () => {
  let component: GoalChartComponent;
  let fixture: ComponentFixture<GoalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
