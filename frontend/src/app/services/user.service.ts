import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webService: WebRequestService) { }

  getTokenPayload() {
    const token = localStorage.getItem('token') || "";

    return jwtDecode(token);
  }

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
