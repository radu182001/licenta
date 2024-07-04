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

  getProjectName(id: number) {
    return this.webService.get(`/api/projects/name/${id}`);
  }

  createProject(name: string, desc: string) {
    return this.webService.post("/api/projects", {name: name, description: desc});
  }

  generateInviteToken(id: number) {
    return this.webService.get(`/api/projects/inviteToken/${id}`);
  }

  accessInvite(token: string) {
    return this.webService.post(`/api/projects/invite/${token}`, {});
  }

  getUsers(projectId: number) {
    return this.webService.get(`/api/projects/users/${projectId}`);
  }

  getStats() {
    return this.webService.get('/api/projects/stats');
  }

  getRole(projectId: number) {
    return this.webService.get(`/api/projects/role/${projectId}`);
  }

  changeRole(id: number, projectId: number, role: string) {
    return this.webService.put(`/api/projects/changeRoles/${projectId}`, {id: id, role: role});
  }

}
