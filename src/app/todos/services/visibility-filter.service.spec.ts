import { TestBed } from '@angular/core/testing';

import { VisibilityFilterService } from './visibility-filter.service';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';

describe('VisibilityFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Location, useClass: SpyLocation }
    ]
  }));

  it('should be created', () => {
    const service: VisibilityFilterService = TestBed.get(VisibilityFilterService);
    expect(service).toBeTruthy();
  });
});
