import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatboxComponent } from './statbox.component';

describe('StatboxComponent', () => {
  let component: StatboxComponent;
  let fixture: ComponentFixture<StatboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
