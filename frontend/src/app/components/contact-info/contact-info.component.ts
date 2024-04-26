import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {

  info: {title: string, value: string}[] = [
    {
      title: "First name",
      value: "Radu"
    },
    {
      title: "Last name",
      value: "Popescu"
    },
    {
      title: "Email",
      value: "radu182001@yahoo.com"
    },
    {
      title: "Telephone",
      value: "0734882229"
    },
    {
      title: "Country",
      value: "-"
    },
    {
      title: "City",
      value: "-"
    }
  ]

}
