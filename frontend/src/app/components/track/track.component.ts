import { Component, Input } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent {
}