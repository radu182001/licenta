import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects-profile-card',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './projects-profile-card.component.html',
  styleUrl: './projects-profile-card.component.scss'
})
export class ProjectsProfileCardComponent implements OnInit{

  stats: any = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.projectService.getStats().subscribe((response: any) => {
        this.stats = response.body;
        console.log(this.stats)
      })
    }
  }

}
