import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPaisEuropeuComponent } from './buscar-pais-europeu.component';

describe('BuscarPaisEuropeuComponent', () => {
  let component: BuscarPaisEuropeuComponent;
  let fixture: ComponentFixture<BuscarPaisEuropeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarPaisEuropeuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuscarPaisEuropeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
