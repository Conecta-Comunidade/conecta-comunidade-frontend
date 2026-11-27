import { TestBed } from '@angular/core/testing';

import { CommunityServices } from './community-services';

describe('CommunityServices', () => {
  let service: CommunityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
