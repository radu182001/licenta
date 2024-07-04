import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input('id') id!: number;

  @Output('role') changeRole = new EventEmitter();

  changeToManager() {
    this.changeRole.emit({id : this.id, role: 'manager'});
    this.role = 'manager';
  }

  changeToMember() {
    this.changeRole.emit({id : this.id, role: 'member'});
    this.role = 'member';
  }

  test: boolean = true;

}
