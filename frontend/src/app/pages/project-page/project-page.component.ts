import { Component, OnInit } from '@angular/core';
import { ProjectOptionCardComponent } from '../../components/project-option-card/project-option-card.component';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [ProjectOptionCardComponent, RouterModule],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent implements OnInit{
  projectName: string | null = "";
  projectId: number = 0;
  userRole: string = "";
  description: string = "";

  constructor (private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        this.projectService.getProject(this.projectId).subscribe((response: any) => {
          this.userRole = response.body.role;
          this.userRole = this.userRole[0].toUpperCase() + this.userRole.substr(1).toLowerCase();;
          this.description = response.body.description;
          this.projectName = response.body.name;
        });
      }
    });
  }
}
