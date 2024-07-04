import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, FormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  hide = true;
  submitted: boolean = false;
  username: string = '';
  password: string = '';
  cPassword: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  @Output() changeForm = new EventEmitter();

  usernameErr: boolean = false;
  emailErr: boolean = false;
  passwordErr: boolean = false;

  constructor(private loginService: LoginService) {}

  register(form: any) {
    this.submitted = true;

    if (this.password.localeCompare(this.cPassword)) {

      this.passwordErr = true;
      console.log("inas")
      return;
    }

    this.passwordErr = false;

    if (form.invalid) {
      return;
    }

    //console.log(this.password, this.cPassword, this.password.localeCompare(this.cPassword));

    this.emailErr = false;
    this.usernameErr = false;

    this.loginService.register(this.username, this.password, this.email, this.firstName, this.lastName).subscribe((response: any) => {
      //console.log(response);
      localStorage.setItem('token', response.token);
      location.reload();
    },
      (error: any) => {
        if (error.error.emailErr) {
          this.emailErr = true;
          console.log('email')
        }

        if (error.error.usernameErr) {
          this.usernameErr = true;
          console.log('username')
        }
      }
    )
  }

  signin() {
    this.changeForm.emit();
  }
}
