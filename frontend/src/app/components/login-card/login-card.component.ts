import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent, CommonModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  login = true;

  change() {
    this.login = !this.login;
  }
}
