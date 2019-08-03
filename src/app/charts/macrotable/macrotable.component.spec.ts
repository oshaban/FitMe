import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrotableComponent } from './macrotable.component';

describe('MacrotableComponent', () => {
  let component: MacrotableComponent;
  let fixture: ComponentFixture<MacrotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacrotableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
