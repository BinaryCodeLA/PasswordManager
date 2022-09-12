import { TestBed } from '@angular/core/testing';

import { SecurityhashService } from './securityhash.service';

describe('SecurityhashService', () => {
  let service: SecurityhashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityhashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
