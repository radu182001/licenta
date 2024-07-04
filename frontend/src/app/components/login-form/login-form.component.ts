import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  hide = true;
  @Output() changeForm = new EventEmitter();

  username: string = '';
  password: string = '';
  submitted: boolean = false;

  error: boolean = false;

  constructor(private loginService: LoginService) {}

  login(form: any) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    this.loginService.login(this.username, this.password).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.token);
      location.reload();
    },
      (error: any) => {
        this.error = true;
      }
    );
  }

  signup() {
    this.changeForm.emit();
  }

}
