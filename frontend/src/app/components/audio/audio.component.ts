import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { start } from 'repl';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss'
})
export class AudioComponent implements OnInit, AfterViewInit, OnChanges{
  @Input("path") path!: string;
  @Input("X") X!: number;
  @Input("zoom") multiplier!: number;
  @Input("playingState") playing!: boolean;
  @Input("markerX") markerX: number = 0;

  @ViewChild('audioContainer') ref!:ElementRef;

  audio!: HTMLAudioElement;
  audioLength: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  viewInitialized = false;
  private isDragging = false;
  initX: number = 0;
  playTimeout!: ReturnType<typeof setTimeout>;
  delayTimeout!: ReturnType<typeof setTimeout>;
  resizingLeft: boolean = false;
  resizingRight: boolean = false;


  constructor(private renderer: Renderer2, private fileService: FileService) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['multiplier'] || changes['X']) && this.viewInitialized) {
      this.setTranslateStyle();
      this.getLength();
    }
    if (changes['playing']) {
      if (this.playing) {
        this.playAudio();
      }
    }
  }

  onMouseDown(event: MouseEvent) {
    if (!this.resizingLeft && !this.resizingRight) {
      this.isDragging = true;
      this.initX = event.clientX;

      window.addEventListener('mousemove', this.onMouseMove.bind(this));
      window.addEventListener('mouseup', this.onMouseUp.bind(this));
    } else if (this.resizingLeft || this.resizingRight) {
      this.initX = event.clientX;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      let delta = event.clientX - this.initX;
      if ((this.X + delta / this.multiplier) >= 0) {
        this.X += delta / this.multiplier;
        this.setTranslateStyle();
        this.initX = event.clientX;
      }
    } else if (this.resizingLeft) {
      let delta = event.clientX - this.initX;
      this.resizeStart(delta);
      this.initX = event.clientX;
    } else if (this.resizingRight) {
      let delta = event.clientX - this.initX;
      this.resizeEnd(delta);
      this.initX = event.clientX;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.resizingLeft = false;
    this.resizingRight = false;

    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  initAudio() {
    console.log(this.path)
    this.fileService.downloadFile(this.path).subscribe((response: any) => {
      console.log(response)
      this.audio = new Audio();
      this.audio.src = response.url;
      this.audio.load();
      this.audio.currentTime = this.startTime;
      this.getLength();
    });
    
  }

  playAudio() {
    if (this.X - this.markerX >= 0){
      this.delayTimeout = setTimeout(() => {
        if (this.playing) {
          this.audio.play();
          this.playTimeout = setTimeout(() => this.stopAudio()
          , (this.audio.duration - this.startTime - this.endTime) * 1000);
        }
      }
      , 10 * (this.X - this.markerX));
    } else {
      this.audio.currentTime += (this.markerX - this.X) / this.multiplier / 100;
      console.log(this.audio.currentTime);
      this.audio.play();
      this.playTimeout = setTimeout(() => this.stopAudio()
      , (this.audio.duration - this.startTime - this.endTime) * 1000);
    }
  }

  stopAudio() {
    clearTimeout(this.playTimeout);
    clearTimeout(this.delayTimeout);
    this.audio.pause();
    this.audio.currentTime = this.startTime;
  }

  resizeEnd(x: number) {
    if (this.endTime - x / this.multiplier / 100 >=0) {
      this.endTime -= x / this.multiplier / 100;
      this.getLength();
    }
  }

  resizeStart(x: number) {
    if (this.startTime + x / this.multiplier / 100 >= 0) {
      this.X += x / this.multiplier;
      this.setTranslateStyle();
      this.startTime += x / this.multiplier / 100;
      this.audio.currentTime = this.startTime;
      console.log(this.audio.currentTime);
      this.getLength();
    }
  }

  getLength() {
    this.audio.addEventListener('loadedmetadata', () => {
      console.log(this.multiplier + "<----");
      this.audioLength = (this.audio.duration - this.startTime - this.endTime) * 100 * this.multiplier;
    });
    this.audioLength = (this.audio.duration - this.startTime - this.endTime) * 100 * this.multiplier;
  }

  setTranslateStyle() {
    const translation = `translateX(${this.X * this.multiplier}px)`; // Use the X input for translation
    this.renderer.setStyle(this.ref.nativeElement, 'transform', translation);
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.setTranslateStyle();
    //this.playAudio();
  }

  ngOnInit() {
    if(typeof Audio != "undefined") {
      this.initAudio();
      //this.getLength();
    }
  }

}
