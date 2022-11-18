import { TestBed } from '@angular/core/testing';

import { DowloandFileService } from './dowloand-file.service';

describe('DowloandFileService', () => {
  let service: DowloandFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DowloandFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
