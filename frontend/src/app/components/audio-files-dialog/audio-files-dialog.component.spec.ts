import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioFilesDialogComponent } from './audio-files-dialog.component';

describe('AudioFilesDialogComponent', () => {
  let component: AudioFilesDialogComponent;
  let fixture: ComponentFixture<AudioFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioFilesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
