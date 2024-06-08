import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
})
export class FileComponent implements OnInit{
  @Input('name') name: any;
  @Input('size') sizeBytes: any;
  @Input('format') format: any;
  @Input('user') user: any;
  @Input('date') timestamp: any;
  @Input('masterRole') masterRole!: string;

  @Output() download = new EventEmitter();
  @Output() delete = new EventEmitter();

  size: string = "";
  date: string = "";

  constructor() {}

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  ngOnInit(): void {
    this.size = this.formatFileSize(this.sizeBytes);
    this.date = this.formatDate(this.timestamp);
  }
}
