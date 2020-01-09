import { TestBed } from '@angular/core/testing';

import { VisibilityFilterService } from './visibility-filter.service';

describe('VisibilityFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisibilityFilterService = TestBed.get(VisibilityFilterService);
    expect(service).toBeTruthy();
  });
});
