import { TestBed } from '@angular/core/testing';

import { UpdateDashboardService } from './update-dashboard.service';

describe('UpdateDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateDashboardService = TestBed.get(UpdateDashboardService);
    expect(service).toBeTruthy();
  });
});
