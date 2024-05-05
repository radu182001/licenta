import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule, FormsModule],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss'
})
export class CreateProjectDialogComponent {

  name: string = "";
  desc: string = "";

  constructor(private dialogRef: MatDialogRef<CreateProjectDialogComponent>, private projectService: ProjectService) {}

  createProject() {
    this.projectService.createProject(this.name, this.desc).subscribe((response: any) => {
      console.log(response.id);
      this.dialogRef.close();
      location.reload();
    })
  }

}
