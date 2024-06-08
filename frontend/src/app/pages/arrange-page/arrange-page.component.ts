import { Component, HostListener, OnInit } from '@angular/core';
import { DawComponent } from '../../components/daw/daw.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AudioFilesDialogComponent } from '../../components/audio-files-dialog/audio-files-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-arrange-page',
  standalone: true,
  imports: [DawComponent, MatButtonModule, MatIconModule, DragDropModule, CommonModule],
  templateUrl: './arrange-page.component.html',
  styleUrl: './arrange-page.component.scss'
})
export class ArrangePageComponent implements OnInit {

  projectId: number = 0;
  role: string = "";
  dragging: boolean = false;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private fileService: FileService, private projectService: ProjectService) {}

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.mouseUp();
  }

  audioFiles: any = [];

  mouseUp() {
    this.dragging = false;
  }

  mouseDown() {
    this.dragging = true;
  }

  importAudio() {
    const dialogRef = this.dialog.open(AudioFilesDialogComponent, { data: {projectId: this.projectId} });

    dialogRef.afterClosed().subscribe(result => {
      this.fileService.getArrangeFiles(this.projectId).subscribe((response: any) => {
        this.audioFiles = response.body;
      })
    })
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
    });

    if (typeof localStorage !== 'undefined' && this.projectId) {
      this.fileService.getArrangeFiles(this.projectId).subscribe((response: any) => {
        this.audioFiles = response.body;
      })
     
      this.projectService.getRole(this.projectId).subscribe((response: any) => {
        this.role = response.role;
      });
    }
  }

}
