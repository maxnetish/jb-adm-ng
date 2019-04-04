import { TestBed } from '@angular/core/testing';

import { JbNgxModalPromisifierService } from './jb-ngx-modal-promisifier.service';

describe('JbNgxModalPromisifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JbNgxModalPromisifierService = TestBed.get(JbNgxModalPromisifierService);
    expect(service).toBeTruthy();
  });
});
