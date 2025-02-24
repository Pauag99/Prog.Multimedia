import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjackListComponent } from './blackjack-list.component';

describe('BlackjackListComponent', () => {
  let component: BlackjackListComponent;
  let fixture: ComponentFixture<BlackjackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackjackListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackjackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
