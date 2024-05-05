import { Component } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent {

}