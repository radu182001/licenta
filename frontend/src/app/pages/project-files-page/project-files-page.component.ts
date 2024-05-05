import { Component, OnInit } from '@angular/core';
import { FileComponent } from '../../components/file/file.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from '../../services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-project-files-page',
  standalone: true,
  imports: [FileComponent, MatCheckboxModule, CommonModule, MatButtonModule, MatDialogModule, MatPaginatorModule],
  templateUrl: './project-files-page.component.html',
  styleUrl: './project-files-page.component.scss'
})
export class ProjectFilesPageComponent implements OnInit{
  projectId: number = 0;
  files: any = [];

  // paging values
  totalFiles: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(private fileService: FileService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {}

  uploadFile(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    let file = eventTarget.files? eventTarget.files[0] : null;

    if (file && !isNaN(this.projectId)) {
      console.log(file);
      this.fileService.uploadFile(this.projectId, file).subscribe((response: any) => {
        this.getFiles();
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

  triggerDelete(key: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.deleted) {
        this.deleteFile(key);
      }
    });
  }

  deleteFile(key: string) {
    console.log("delete");
    this.fileService.deleteFile(key).subscribe((response: any) => {
      this.files = this.files.filter((file: any) => file.key !== key);
      this.getFiles();
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;

    this.router.navigate([], {relativeTo: this.route.parent, queryParams: {page: this.pageIndex + 1},})
  }

  getFiles() {
    this.route.queryParamMap.subscribe(params => {
      let page = params.get('page');
      this.fileService.getFilesList(this.projectId, {page: page, pageSize: this.pageSize}).subscribe((response: any) => {
        this.files = response.body;
        this.totalFiles = response.total.count;
        console.log(response)
      });
    })
    
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        this.getFiles();
      }
    });
  }
}
