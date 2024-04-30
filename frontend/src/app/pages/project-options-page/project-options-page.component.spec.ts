import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOptionsPageComponent } from './project-options-page.component';

describe('ProjectOptionsPageComponent', () => {
  let component: ProjectOptionsPageComponent;
  let fixture: ComponentFixture<ProjectOptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOptionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectOptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
