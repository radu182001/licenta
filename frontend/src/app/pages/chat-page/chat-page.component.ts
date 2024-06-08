import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessageComponent } from '../../components/message/message.component';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { io } from "socket.io-client";
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [MatIconModule, MessageComponent, CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  projectId: number = 0;
  chatId: number = 0;
  payload: any = 0;

  messages: any = [];
  users: any = [];

  text: string = "";
  typingUser: string = "";
  typingTimeout: any = null;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    private chatService: ChatService, 
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router,
    private socketService: SocketService,
    private projectService: ProjectService
  ) {}

  sendMessage() {
    if (this.text) {
      this.chatService.addMessage(this.chatId, this.text, this.projectId).subscribe((response: any) => {
        //this.messages.push(response.msg);
        this.text = "";
      })
    }
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        this.payload = this.userService.getTokenPayload();
        this.chatService.getChatId(this.projectId).subscribe((response: any) => {
          this.chatId = Number(response.id);
          //console.log(this.chatId)
          this.chatService.getMessages(this.chatId, this.projectId).subscribe((response: any) => {
            console.log(response.messages)
            this.messages = response.messages;
            this.getUsers();
            this.connect();
          })
        })
      }
    });
    

  }

  ngAfterViewChecked(): void {
    // Set scroll to botom
    this.setScrollBottom();
  }

  connect() {
    this.socketService.connect();
    this.socketService.listen(`newMessage/${this.chatId}`).subscribe((data) => {
      this.messages.push(data);
      
    })

    this.socketService.listen(`typing/${this.chatId}`).subscribe((data) => {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }

      this.typingUser = this.users.find((user: any) => user.id === data.userId)?.username || '';

      this.typingTimeout = setTimeout(() => {
        this.typingUser = '';
      }, 1500); // Hide the typing indicator after 3 seconds
    })
  }

  typing() {
    this.socketService.emit("typing", {chatId: this.chatId, userId: this.payload.id})
  }

  getUsers() {
    this.projectService.getUsers(this.projectId).subscribe((response: any) => {
      this.users = response.users;
      console.log(this.users)
    })
  }

  setScrollBottom() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
