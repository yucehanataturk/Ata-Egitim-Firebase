import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgitimdetayComponent } from './egitimdetay.component';

describe('EgitimdetayComponent', () => {
  let component: EgitimdetayComponent;
  let fixture: ComponentFixture<EgitimdetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgitimdetayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgitimdetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
