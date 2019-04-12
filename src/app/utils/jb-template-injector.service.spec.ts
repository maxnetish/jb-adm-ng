import { TestBed } from '@angular/core/testing';

import { JbTemplateInjectorService } from './jb-template-injector.service';

describe('JbTemplateInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JbTemplateInjectorService = TestBed.get(JbTemplateInjectorService);
    expect(service).toBeTruthy();
  });
});
