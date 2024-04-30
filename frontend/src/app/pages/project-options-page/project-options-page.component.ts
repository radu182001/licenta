import { Component, Output } from '@angular/core';
import { ProjectOptionCardComponent } from '../../components/project-option-card/project-option-card.component';

@Component({
  selector: 'app-project-options-page',
  standalone: true,
  imports: [ProjectOptionCardComponent],
  templateUrl: './project-options-page.component.html',
  styleUrl: './project-options-page.component.scss'
})
export class ProjectOptionsPageComponent {
}
