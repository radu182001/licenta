import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProfileCardComponent } from './projects-profile-card.component';

describe('ProjectsProfileCardComponent', () => {
  let component: ProjectsProfileCardComponent;
  let fixture: ComponentFixture<ProjectsProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
