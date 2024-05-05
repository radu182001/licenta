import { Component, OnInit, Output } from '@angular/core';
import { ProjectOptionCardComponent } from '../../components/project-option-card/project-option-card.component';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-options-page',
  standalone: true,
  imports: [ProjectOptionCardComponent],
  templateUrl: './project-options-page.component.html',
  styleUrl: './project-options-page.component.scss'
})
export class ProjectOptionsPageComponent implements OnInit{

  projectId: number = 0;
  userRole: string = "";
  description: string = "";

  constructor (private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.parent?.paramMap.subscribe(params => {
    //   this.projectId = Number(params.get('id'));
    //   if (isNaN(this.projectId)) {
    //     console.error("Project ID is not available or invalid");
    //   } else if (typeof localStorage !== 'undefined') { 
    //     this.projectService.getProject(this.projectId).subscribe((response: any) => {
    //       this.userRole = response.role;
    //       this.description = response.description;
    //     });
    //   }
    // });
  }

}
