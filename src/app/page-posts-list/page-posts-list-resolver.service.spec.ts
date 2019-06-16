import { TestBed } from '@angular/core/testing';

import { PagePostsListResolverService } from './page-posts-list-resolver.service';

describe('PagePostsListsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagePostsListResolverService = TestBed.get(PagePostsListResolverService);
    expect(service).toBeTruthy();
  });
});
