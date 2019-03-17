import { TestBed } from '@angular/core/testing';

import { NgbDateStringAdapterService } from './ngb-date-string-adapter.service';

describe('NgbDateStringAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbDateStringAdapterService = TestBed.get(NgbDateStringAdapterService);
    expect(service).toBeTruthy();
  });
});
