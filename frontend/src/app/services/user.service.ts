import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webService: WebRequestService) { }

  getFullName() {
    return this.webService.get("/api/users/getFullName");
  }

  getUsername() {
    return this.webService.get("/api/users/getUsername");
  }

  getProfilePicture() {
    return this.webService.get("/api/files/profile");
  }

}
