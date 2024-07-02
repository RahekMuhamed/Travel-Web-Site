import { TestBed } from '@angular/core/testing';

import { BookingPackageService } from './booking-package.service';

describe('BookingPackageService', () => {
  let service: BookingPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
