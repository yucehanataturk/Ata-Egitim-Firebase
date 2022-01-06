import { TestBed } from '@angular/core/testing';

import { FavoriegitimservisService } from './favoriegitimservis.service';

describe('FavoriegitimservisService', () => {
  let service: FavoriegitimservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriegitimservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
