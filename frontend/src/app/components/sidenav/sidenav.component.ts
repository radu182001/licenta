import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, 
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{
  showProjects: boolean = false;
  widthThreshold: number = 5;
  sideNavWidth: number = 5;
  imgSize: number = 2.6;
  projectsMaxHeight: number = 5;
  projects: any = [];

  // User attributes
  fullname: string = "";
  username: string = "";
  profilePath: string = "../../../assets/profile-placeholder.png";

  constructor(private userService: UserService, private projectService: ProjectService) {}

  increase(): void {
    this.sideNavWidth = 18;
    this.imgSize = 3.5;
  }

  decrease(): void {
    this.sideNavWidth = 5;
    this.imgSize = 2.6;
    this.showProjects = false;
  }

  toggleProjects(): void {
    this.showProjects = !this.showProjects;
  }

  logout(): void {
    localStorage.removeItem('token');
    location.reload();
  }

  // Dynamically updates the max-height for the projects list
  updateProjectsHeight() {
    if (this.projects.length <= 5)
      this.projectsMaxHeight *= this.projects.length;
    else this.projectsMaxHeight *= 5;
  }

  ngOnInit(): void {
    
    if (typeof localStorage !== 'undefined') {
      // Get full name of user
      this.userService.getFullName().subscribe((response: any) => {
        this.fullname = response.body;
      });

      this.userService.getUsername().subscribe((response: any) => {
        this.username = response.body;
      });

      this.userService.getProfilePicture().subscribe(
        (response: any) => {
          this.profilePath = response.url;
        },
        (error: any) => {
          this.profilePath = "../../../assets/profile-placeholder.png"; // Use an error-specific image if you prefer
      });

      this.projectService.getProjects().subscribe((response: any) => {
        this.projects = response.body;
        this.updateProjectsHeight();
      });

    }
  }
}
