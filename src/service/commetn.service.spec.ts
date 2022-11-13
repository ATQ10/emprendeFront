import { TestBed } from '@angular/core/testing';

import { CommetnService } from './commetn.service';

describe('CommetnService', () => {
  let service: CommetnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommetnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
