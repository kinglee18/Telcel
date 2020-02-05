import { TestBed } from '@angular/core/testing';

import { CustomerCareService } from './customer-care.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerCareService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CustomerCareService = TestBed.get(CustomerCareService);
    expect(service).toBeTruthy();
  });
});
