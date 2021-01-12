import { TestBed } from '@angular/core/testing';

import { KstService } from './kst.service';

describe('KstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KstService = TestBed.get(KstService);
    expect(service).toBeTruthy();
  });
});
