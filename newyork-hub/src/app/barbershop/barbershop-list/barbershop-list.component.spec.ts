import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbershopListComponent } from './barbershop-list.component';

describe('BarbershopListComponent', () => {
  let component: BarbershopListComponent;
  let fixture: ComponentFixture<BarbershopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarbershopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarbershopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
