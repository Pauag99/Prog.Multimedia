import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeListComponent } from './arcade-list.component';

describe('ArcadeListComponent', () => {
  let component: ArcadeListComponent;
  let fixture: ComponentFixture<ArcadeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcadeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
