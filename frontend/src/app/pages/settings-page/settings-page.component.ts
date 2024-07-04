import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from '../../components/user/user.component';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, MatButtonModule, UserComponent, MatDividerModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  inviteLink: string = ""
  users: any = [];

  changes: any = [];

  projectId: number = 0;
  role: string = "";

  constructor(private projectService: ProjectService, private route: ActivatedRoute){}

  generateInviteLink() {
    this.projectService.generateInviteToken(this.projectId).subscribe((response: any) => {
      this.inviteLink = "localhost:4200/home/invite/" + response.token;
    })
  }

  getUsers() {
    this.projectService.getUsers(this.projectId).subscribe((response: any) => {
      this.users = response.users;
    })
  }

  addChange(e: any) {
    
    const index = this.changes.findIndex((c: any) => c.id === e.id);

    if (index >= 0) {
      this.changes[index].role = e.role;
    }
    else {
      const change = {id: e.id, role: e.role};
      this.changes.push(change);
    }
    console.log(this.changes);
  }

  saveChanges() {
    this.changes.forEach((change: any) => {
      this.projectService.changeRole(change.id, this.projectId, change.role).subscribe((response) => {
        console.log("updated");
        this.changes = [];
      });
    });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        // get users
        this.getUsers();
        this.projectService.getRole(this.projectId).subscribe((response: any) => {
          this.role = response.role;
        });
      }
    });
  }

}
