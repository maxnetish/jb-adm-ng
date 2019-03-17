import { TestBed } from '@angular/core/testing';

import { NgbDateLocaleParserFormatterService } from './ngb-date-locale-parser-formatter.service';

describe('NgbDateLocaleParserFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbDateLocaleParserFormatterService = TestBed.get(NgbDateLocaleParserFormatterService);
    expect(service).toBeTruthy();
  });
});
