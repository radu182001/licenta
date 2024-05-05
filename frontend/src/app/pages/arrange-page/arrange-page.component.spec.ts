import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangePageComponent } from './arrange-page.component';

describe('ArrangePageComponent', () => {
  let component: ArrangePageComponent;
  let fixture: ComponentFixture<ArrangePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
