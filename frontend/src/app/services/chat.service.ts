import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private webService: WebRequestService) { }

  getChatId(projectId: number) {
    return this.webService.get(`/api/chat/chatId/${projectId}`);
  }

  getMessages(chatId: number, projectId: number) {
    return this.webService.get(`/api/chat/${projectId}/${chatId}`);
  }

  addMessage(chatId: number, msg: string, projectId: number) {
    return this.webService.post(`/api/chat/${projectId}/${chatId}`, {text: msg});
  }

}
