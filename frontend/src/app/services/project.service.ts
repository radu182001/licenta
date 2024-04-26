import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private webService: WebRequestService) { }

  getProjects() {
    return this.webService.get("/api/projects");
  }

}
