import { TestBed } from '@angular/core/testing';

import { EtcdService } from './etcd.service';

describe('EtcdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtcdService = TestBed.get(EtcdService);
    expect(service).toBeTruthy();
  });
});
