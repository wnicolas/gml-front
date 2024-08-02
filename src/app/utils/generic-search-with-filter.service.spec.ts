import { TestBed } from '@angular/core/testing';

import { GenericSearchWithFilterService } from './generic-search-with-filter.service';

describe('GenericSearchWithFilterService', () => {
  let service: GenericSearchWithFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericSearchWithFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
