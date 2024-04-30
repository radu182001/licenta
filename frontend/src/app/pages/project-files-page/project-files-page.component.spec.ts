import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFilesPageComponent } from './project-files-page.component';

describe('ProjectFilesPageComponent', () => {
  let component: ProjectFilesPageComponent;
  let fixture: ComponentFixture<ProjectFilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFilesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectFilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
