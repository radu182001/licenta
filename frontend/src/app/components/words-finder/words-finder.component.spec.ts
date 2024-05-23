import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsFinderComponent } from './words-finder.component';

describe('WordsFinderComponent', () => {
  let component: WordsFinderComponent;
  let fixture: ComponentFixture<WordsFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordsFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
