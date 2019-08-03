import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroStatBoxComponent } from './macro-stat-box.component';

describe('MacroStatBoxComponent', () => {
  let component: MacroStatBoxComponent;
  let fixture: ComponentFixture<MacroStatBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroStatBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroStatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
