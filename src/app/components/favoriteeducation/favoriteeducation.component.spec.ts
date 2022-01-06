import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteeducationComponent } from './favoriteeducation.component';

describe('FavoriteeducationComponent', () => {
  let component: FavoriteeducationComponent;
  let fixture: ComponentFixture<FavoriteeducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteeducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteeducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
