import { TestBed } from '@angular/core/testing';

import { LongEasyManagerService } from './long-easy-manager.service';

describe('LongEasyManagerService', () => {
  let service: LongEasyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongEasyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
