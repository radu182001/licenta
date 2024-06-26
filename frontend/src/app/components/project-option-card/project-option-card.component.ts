import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Input('path') path: string = "";
  @Input('paging') paging: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigate() {
    if (this.path) {
      if (this.paging)
        this.router.navigate([this.path], { relativeTo: this.route.parent, queryParams: {page: 1} });
      else this.router.navigate([this.path], { relativeTo: this.route.parent });
    }
  }
}
