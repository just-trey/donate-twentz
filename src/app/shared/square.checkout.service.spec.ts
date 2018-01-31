import { TestBed, inject } from '@angular/core/testing';

import { SquareCheckoutService } from './square.checkout.service';

describe('SquareCheckoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SquareCheckoutService]
    });
  });

  it('should be created', inject([SquareCheckoutService], (service: SquareCheckoutService) => {
    expect(service).toBeTruthy();
  }));
});
