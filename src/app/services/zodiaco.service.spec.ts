import { TestBed } from '@angular/core/testing';

import { ZodiacoService } from './zodiaco.service';

describe('ZodiacoService', () => {
  let service: ZodiacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZodiacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
