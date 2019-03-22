import { TestBed } from '@angular/core/testing';

import { ResourcesUtilsService } from './resources-utils.service';

describe('ResourcesUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesUtilsService = TestBed.get(ResourcesUtilsService);
    expect(service).toBeTruthy();
  });
});
