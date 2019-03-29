import { TestBed } from '@angular/core/testing';

import { FileStoreService } from './file-store.service';

describe('FileStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileStoreService = TestBed.get(FileStoreService);
    expect(service).toBeTruthy();
  });
});
