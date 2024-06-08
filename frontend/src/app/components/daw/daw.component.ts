import { Component, OnInit, ViewChild, ViewChildren, QueryList, HostListener, ChangeDetectorRef, Input, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AudioComponent } from '../audio/audio.component';
import { TrackComponent } from '../track/track.component';
import {DragDropModule, CdkDragDrop} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-daw',
  standalone: true,
  imports: [AudioComponent, TrackComponent, DragDropModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './daw.component.html',
  styleUrl: './daw.component.scss'
})
export class DawComponent implements OnInit, AfterViewInit, OnChanges{
  @Input('dragging') dragging: boolean = false;
  @Input('projectId') projectId: number = 0;
  @Input('masterRole') masterRole!: string;

  @ViewChild('container') scrollContainer!: ElementRef;
  @ViewChild('timeMarker') timeMarker!: ElementRef;
  @ViewChild('markLines') markLines!: ElementRef;
  @ViewChild('timeline') timeline!: ElementRef;
  @ViewChild('timeNumber') timeNumber!: ElementRef;

  playing: boolean = false;
  private intervalId: any = null;

  isSaved: boolean = true;

  @ViewChildren(AudioComponent) audioComponents!: QueryList<AudioComponent>;

  translateX: number = 0;
  translateLastPos: number = 0;
  markerFrameRate: number = 10;
  zoom: number = 1;
  timeLength: number = 0

  secondLen: number = 0;
  seconds:any = [];

  tracks: any[] = [
    { audios: [] },
    { audios: [] },
    { audios: [] },
    { audios: [] },
    { audios: [] },
    // More tracks can be added dynamically
  ];

  changes: any = [];

  constructor(private fileService: FileService) {}

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
      this.translateX = this.translateLastPos;
      this.playing = false;
    }
  }

  // Dragging functions

  onDrop(event: CdkDragDrop<any>) {
    const fileData = event.item.data; // Data passed from the drag source
    const relativePosition = this.getRelativePosition(event);
    const X = relativePosition.x + this.scrollContainer.nativeElement.scrollLeft;

    this.fileService.addToDawAudio(this.projectId, fileData.id, X, relativePosition.y).subscribe((response: any) => {
      console.log("id: " + response.id)
      this.tracks[relativePosition.y].audios.push({
        path: fileData.key,
        x: X,
        starttime: 0,
        endtime: 0,
        id: response.id
      });
    })

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

  deleteAudio(id: number) {
    this.fileService.deleteDawAudio(id, this.projectId).subscribe((response: any) => {
      this.tracks.forEach(track => {
        const audioIndex = track.audios.findIndex((audio: any) => audio.id === id);
        if (audioIndex !== -1) {
          track.audios.splice(audioIndex, 1);
        }
      });
    })
  }
  
  moveMarker(event: MouseEvent) {
    //console.log(event.clientX - this.scrollContainer.nativeElement.getBoundingClientRect().left)
    this.translateX = event.clientX - this.scrollContainer.nativeElement.getBoundingClientRect().left + this.scrollContainer.nativeElement.scrollLeft;
    this.translateLastPos = this.translateX;
  }

  goToStart() {
    this.translateX = 0;
    this.translateLastPos = this.translateX;

    if (this.playing) {
      this.play();
    }
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

  handleXChanges(e: number, id: number) {
    console.log("xchange");
    if (this.isSaved)
      this.isSaved = false;

    const index = this.changes.findIndex((c: any) => c.id === id);

    if (index >= 0) {
      this.changes[index].X = e;
    }
    else {
      const change = {id: id, X: e};
      this.changes.push(change);
    }

    console.log(this.changes);
  }

  handleStartChange(e: number, id: number) {
    console.log("startchange");
    if (this.isSaved)
      this.isSaved = false;

    const index = this.changes.findIndex((c: any) => c.id === id);

    if (index >= 0) {
      this.changes[index].startTime = e;
    }
    else {
      const change = {id: id, startTime: e};
      this.changes.push(change);
    }

    console.log(this.changes);

  }

  handleEndChange(e: number, id: number) {
    console.log("endchange");
    if (this.isSaved)
      this.isSaved = false;

    const index = this.changes.findIndex((c: any) => c.id === id);

    if (index >= 0) {
      this.changes[index].endTime = e;
    }
    else {
      const change = {id: id, endTime: e};
      this.changes.push(change);
    }

    console.log(this.changes);
  }

  saveChanges() {

    this.changes.forEach((change: any) => {
      this.fileService.updateDawAudio(change.id, this.projectId, change.X, change.startTime, change.endTime).subscribe((response) => {
        console.log("updated");
      });
    });

    this.isSaved = true;
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && this.projectId) {
      this.fileService.getDawAudios(this.projectId).subscribe((response: any) => {
        for (let track of response.body) {
          this.tracks[track.trackindex].audios = track.audios;
        }
      });
    }

    console.log(this.tracks)
  }

  ngAfterViewInit(): void {
    // Now it's safe to use nativeElement
    this.timeLength = this.getTimeLength();
    this.seconds = Array.from({ length: this.timeLength + 1 }, (_, i) => i + 1);

    const container: HTMLElement = this.scrollContainer.nativeElement;
    const timeMarker: HTMLElement = this.timeMarker.nativeElement;
    timeMarker.style.height = `${container.scrollHeight}px`;
    this.markLines.nativeElement.style.height = `${container.scrollHeight}px`;
    //this.syncScroll(); // Example call if needed immediately after view init
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}