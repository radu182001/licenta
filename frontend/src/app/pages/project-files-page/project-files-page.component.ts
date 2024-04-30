import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../../components/file/file.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from '../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-project-files-page',
  standalone: true,
  imports: [FileComponent, MatCheckboxModule, CommonModule, MatButtonModule],
  templateUrl: './project-files-page.component.html',
  styleUrl: './project-files-page.component.scss'
})
export class ProjectFilesPageComponent implements OnInit{
  projectId: number = 0;
  files: any = [];

  constructor(private fileService: FileService, private route: ActivatedRoute) {}

  uploadFile(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    let file = eventTarget.files? eventTarget.files[0] : null;

    if (file && !isNaN(this.projectId)) {
      console.log(file);
      this.fileService.uploadFile(this.projectId, file).subscribe((response: any) => {
        this.files.push(response.body);
      });
    }
  }

  downloadFile(key: string) {
    this.fileService.downloadFile(key).subscribe((response: any) => {
      const url = response.url;
      const link = document.createElement('a');
      link.href = url;
      //link.download = key.split('/').pop() ? key.split('/').pop() : "file";

      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  deleteFile(key: string) {
    console.log("delete");
    this.fileService.deleteFile(key).subscribe((response: any) => {
      this.files = this.files.filter((file: any) => file.key !== key);
    })
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        this.fileService.getFilesList(this.projectId).subscribe((response: any) => {
          console.log(response.body);
          this.files = response.body;
        });
      }
    });
  }
}
