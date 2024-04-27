import { Component } from '@angular/core';
import { ProjectOptionCardComponent } from '../../components/project-option-card/project-option-card.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [ProjectOptionCardComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent {

}
