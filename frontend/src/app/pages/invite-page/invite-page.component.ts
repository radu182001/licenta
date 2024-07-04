import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss'
})
export class InvitePageComponent implements OnInit{

  token: string = "";
  projectId: number = 0;
  projectName: string = "";
  payload: any = {};

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {}

  join() {
    this.projectService.accessInvite(this.token).subscribe((response: any) => {
      this.exit();
    })
  }

  exit() {
    if (this.route.parent) {
      const parentRoute = this.route.parent.snapshot.url.map(segment => segment.path).join('/');
      console.log(parentRoute)
      this.router.navigate([`/${parentRoute}`]);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || "";
      if (this.token) {
        this.payload = jwtDecode(this.token);
        this.projectId = Number(this.payload.projectId);
        //this.projectId = 5;
        
        if (isNaN(this.projectId)) {
          console.error("Project ID is not available or invalid");
        } else if (typeof localStorage !== 'undefined') { 
          
          this.projectService.getProjectName(this.projectId).subscribe((response: any) => {
            console.log(this.projectId);
            console.log(response);
            this.projectName = response.body.name;
          });
        }
      }
    });
  }

}
