import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SidenavComponent, MatButtonModule, MatIconModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private dialog: MatDialog) {}

  openCreateProject() {
    this.dialog.open(CreateProjectDialogComponent);
  }

}
