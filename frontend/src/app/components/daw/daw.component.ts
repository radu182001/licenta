import { Component, OnInit, ViewChild, ViewChildren, QueryList, HostListener, ChangeDetectorRef, Input, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AudioComponent } from '../audio/audio.component';
import { TrackComponent } from '../track/track.component';
import {DragDropModule, CdkDragDrop} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-daw',
  standalone: true,
  imports: [AudioComponent, TrackComponent, DragDropModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './daw.component.html',
  styleUrl: './daw.component.scss'
})
export class DawComponent implements OnInit, AfterViewInit{
  @Input('dragging') dragging: boolean = false;

  @ViewChild('container') scrollContainer!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timeNumber') timeNumber!: ElementRef;

  playing: boolean = false;
  private intervalId: any = null;

  @ViewChildren(AudioComponent) audioComponents!: QueryList<AudioComponent>;

  translateX: number = 0;
  markerFrameRate: number = 10;
  zoom: number = 1;
  timeLength: number = 0

  secondLen: number = 0;
  seconds:any = [];
  time: number = 0;

  tracks: any[] = [
    { audios: [] },
    { audios: [] },
    { audios: [] },
    { audios: [] },
    { audios: [] },
    // More tracks can be added dynamically
  ];

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.altKey) {
      if (event.deltaY > 0) {
        this.zoomOut();
      } else {
        this.zoomIn();
      }
    }
  }

  zoomIn() {
    this.zoom++;
  }

  zoomOut() {
    if (this.zoom >= 2) {
      this.zoom--;
    }
  }

  play() {
    if (!this.playing) {
      this.intervalId = setInterval(() => {
        this.translateX += this.zoom;
        this.time = this.markerFrameRate;
      }, this.markerFrameRate);

      this.playing = true;

      // this.audioComponents.forEach((audioComponent) => {
      //   audioComponent.playAudio();
      // });

    } else if (this.intervalId !== null) {
      this.audioComponents.forEach((audioComponent) => {
        audioComponent.stopAudio();
      });

      clearInterval(this.intervalId);
      this.translateX = 0;
      this.time = 0;
      this.playing = false;
    }
  }

  // Dragging functions

  onDrop(event: CdkDragDrop<any>) {
    const fileData = event.item.data; // Data passed from the drag source
    const relativePosition = this.getRelativePosition(event);

    this.tracks[relativePosition.y].audios.push({
      path: fileData.key,
      X: relativePosition.x + this.scrollContainer.nativeElement.scrollLeft,
    });
  }
  
  private getRelativePosition(event: CdkDragDrop<any>): {x: number, y: number} {
    const dropZoneRect = (event.container.element.nativeElement as HTMLElement).getBoundingClientRect();
    
    const slope = this.tracks.length / (dropZoneRect.bottom - dropZoneRect.top + this.scrollContainer.nativeElement.scrollHeight - this.scrollContainer.nativeElement.clientHeight);
    const y_map = slope * (event.dropPoint.y - dropZoneRect.top + this.scrollContainer.nativeElement.scrollTop);

    console.log(Math.floor(y_map))

    return {
      x: event.dropPoint.x - dropZoneRect.left,
      y: Math.floor(y_map)
    };
  }
  
  moveMarker(event: MouseEvent) {
    //console.log(event.clientX - this.scrollContainer.nativeElement.getBoundingClientRect().left)
    this.translateX = event.clientX - this.scrollContainer.nativeElement.getBoundingClientRect().left + this.scrollContainer.nativeElement.scrollLeft;
  }

  syncScroll(): void {
    if (this.timeline && this.scrollContainer) {
      const containerScrollPosition = this.scrollContainer.nativeElement.scrollLeft;
      this.timeline.nativeElement.scrollLeft = containerScrollPosition;
    }
  }

  getTimeLength() {
    this.secondLen = 1000 / this.markerFrameRate
    return this.scrollContainer.nativeElement.scrollWidth / (this.secondLen * this.zoom);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Now it's safe to use nativeElement
    this.timeLength = this.getTimeLength();
    this.seconds = Array.from({ length: this.timeLength + 1 }, (_, i) => i + 1);

    //this.syncScroll(); // Example call if needed immediately after view init
  }
}