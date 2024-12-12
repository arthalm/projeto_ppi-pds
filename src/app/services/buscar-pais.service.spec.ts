import { TestBed } from '@angular/core/testing';

import { BuscarPaisService } from './services/buscar-pais.service';

describe('BuscarPaisService', () => {
  let service: BuscarPaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarPaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
