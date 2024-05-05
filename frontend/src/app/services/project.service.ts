import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private webService: WebRequestService) { }

  getProject(id: number) {
    return this.webService.get(`/api/projects/${id}`);
  }

  getProjects() {
    return this.webService.get("/api/projects");
  }

  createProject(name: string, desc: string) {
    return this.webService.post("/api/projects", {name: name, description: desc});
  }

}
