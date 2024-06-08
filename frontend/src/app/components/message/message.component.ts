import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{
  @Input('self') self!: boolean;
  @Input('username') username: string = "";

  @Input('msg') text: string = "";
  @Input('time') time: string = "";

  ngOnInit(): void {
    this.time = this.formatTime(this.time);
  }

  formatTime(time: string) {
    const date = new Date(time);

    const isHour12 = (new Intl.DateTimeFormat([], { hour: 'numeric' }).resolvedOptions().hourCycle === 'h12');

    // Format the date to the client's local timezone
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: isHour12,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  
  }

}
