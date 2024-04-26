import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit{
  fullname: string = "";
  username: string = "";

  profilePath: string = "../../../assets/profile-placeholder.png"

  constructor(private userService: UserService, private projectService: ProjectService) {}

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

    }
  }

}
