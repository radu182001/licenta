import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhymeFinderComponent } from './rhyme-finder.component';

describe('RhymeFinderComponent', () => {
  let component: RhymeFinderComponent;
  let fixture: ComponentFixture<RhymeFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhymeFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RhymeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
