import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOptionCardComponent } from './project-option-card.component';

describe('ProjectOptionCardComponent', () => {
  let component: ProjectOptionCardComponent;
  let fixture: ComponentFixture<ProjectOptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOptionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
