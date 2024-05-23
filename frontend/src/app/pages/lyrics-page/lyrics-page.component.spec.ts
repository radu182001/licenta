import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsPageComponent } from './lyrics-page.component';

describe('LyricsPageComponent', () => {
  let component: LyricsPageComponent;
  let fixture: ComponentFixture<LyricsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyricsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LyricsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
