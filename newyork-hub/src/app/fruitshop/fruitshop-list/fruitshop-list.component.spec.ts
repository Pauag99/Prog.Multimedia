import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitshopListComponent } from './fruitshop-list.component';

describe('FruitshopListComponent', () => {
  let component: FruitshopListComponent;
  let fixture: ComponentFixture<FruitshopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitshopListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitshopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
