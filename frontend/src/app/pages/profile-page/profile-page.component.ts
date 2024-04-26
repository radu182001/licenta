import { Component } from '@angular/core';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ProjectsProfileCardComponent } from '../../components/projects-profile-card/projects-profile-card.component';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, ProjectsProfileCardComponent, ContactInfoComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
