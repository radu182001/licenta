import { Component, OnInit, Inject } from '@angular/core';
import { FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-audio-files-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatPaginatorModule],
  templateUrl: './audio-files-dialog.component.html',
  styleUrl: './audio-files-dialog.component.scss'
})
export class AudioFilesDialogComponent implements OnInit{
  projectId: number = 0;
  files: any = [];
  page: number = 1;
  pageSize: number = 10;
  totalFiles: number = 1;

  constructor(private fileService: FileService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AudioFilesDialogComponent>) {
    this.projectId = data.projectId;
  }

  getFiles() {
    this.fileService.getAudioFilesList(this.projectId, {page: this.page, pageSize: this.pageSize}).subscribe((response: any) => {
      this.totalFiles = response.total.count;
      this.files = response.body;
      console.log(response)
    })
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;

  }

  importAudio(files: any[]) {

    if (files.length)
      this.fileService.addToArrangeFile(this.projectId, files[0].value.id).subscribe((response: any) => {
        this.dialogRef.close();
      })

    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (isNaN(this.projectId)) {
      console.error("Project ID is not available or invalid");
    } else if (typeof localStorage !== 'undefined') { 
      this.getFiles();
    }
  }

}
