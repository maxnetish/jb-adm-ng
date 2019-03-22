import { TestBed } from '@angular/core/testing';

import { PagePostResolverService } from './page-post-resolver.service';

describe('PagePostResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagePostResolverService = TestBed.get(PagePostResolverService);
    expect(service).toBeTruthy();
  });
});
