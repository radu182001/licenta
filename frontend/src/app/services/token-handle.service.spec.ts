import { TestBed } from '@angular/core/testing';

import { TokenHandleService } from './token-handle.service';

describe('TokenHandleService', () => {
  let service: TokenHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
