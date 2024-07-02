import { TestBed } from '@angular/core/testing';

import { ServiceProviderServiceService } from './service-provider-service.service';

describe('ServiceProviderServiceService', () => {
  let service: ServiceProviderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProviderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
