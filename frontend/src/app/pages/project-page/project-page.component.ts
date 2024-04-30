import { Component, OnInit } from '@angular/core';
import { ProjectOptionCardComponent } from '../../components/project-option-card/project-option-card.component';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [ProjectOptionCardComponent, RouterModule],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent implements OnInit{
  projectName: string | null = "";


  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectName = params.get("name");
    })
  }
}
