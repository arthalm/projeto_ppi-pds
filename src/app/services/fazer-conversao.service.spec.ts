import { TestBed } from '@angular/core/testing';

import { FazerConversaoService } from './fazer-conversao.service';

describe('FazerConversaoService', () => {
  let service: FazerConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FazerConversaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
