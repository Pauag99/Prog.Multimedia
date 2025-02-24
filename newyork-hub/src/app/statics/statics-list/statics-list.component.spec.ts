import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsListComponent } from './statics-list.component';

describe('StaticsListComponent', () => {
  let component: StaticsListComponent;
  let fixture: ComponentFixture<StaticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
