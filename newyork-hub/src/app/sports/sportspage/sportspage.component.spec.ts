import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportspageComponent } from './sportspage.component';

describe('SportspageComponent', () => {
  let component: SportspageComponent;
  let fixture: ComponentFixture<SportspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
