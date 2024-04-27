import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-option-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './project-option-card.component.html',
  styleUrl: './project-option-card.component.scss'
})
export class ProjectOptionCardComponent {
  @Input('icon') icon: string = "";
  @Input('title') title: string = "";
}
