import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TokenHandleService } from './services/token-handle.service';

import { Token } from './utils/token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  token: string | null = null;

  constructor(private router: Router, private tokenHandler: TokenHandleService) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.tokenHandler.validateToken().subscribe((token: string | null) => {
        Token.setToken(token);
        console.log('token: ' + token);
        if (!token) {
          this.router.navigate(['auth']);
        }
        else if (this.router.url === '/auth') {
          this.router.navigate(['home']);
        }
      });
    }
  }
}
