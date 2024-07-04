import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webReqService: WebRequestService) { }

  login(username: string, password: string) {
    return this.webReqService.post('/api/auth', {username: username, password: password});
  }

  register(username: string, password: string, email: string, firstName: string, lastName: string) {
    return this.webReqService.post('/api/users', {
      username: username,
      password: password,
      email: email,
      firstname: firstName,
      lastname: lastName 
    })
  }
}
