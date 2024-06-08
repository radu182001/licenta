import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input('username') username!: string;
  @Input('image') image!: string;
  @Input('role') role!: string;
  @Input('masterRole') masterRole!: string;

  test: boolean = true;

}
