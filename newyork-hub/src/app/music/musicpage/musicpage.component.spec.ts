import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicpageComponent } from './musicpage.component';

describe('MusicpageComponent', () => {
  let component: MusicpageComponent;
  let fixture: ComponentFixture<MusicpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
