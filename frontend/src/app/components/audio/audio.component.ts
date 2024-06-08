import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import WaveSurfer from 'wavesurfer.js'
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
  @Input("startTime") startTime: number = 0;
  @Input("endTime") endTime: number = 0;
  @Input("id") id: number = 0;
  @Input('masterRole') masterRole!: string;

  @Output("del") del = new EventEmitter();
  @Output("XChange") XChange = new EventEmitter();
  @Output("startChange") startTimeChange = new EventEmitter();
  @Output("endChange") endTimeChange = new EventEmitter();

  @ViewChild('audioContainer') ref!:ElementRef;

  isSelected: boolean = false;

  audio!: HTMLAudioElement;
  audioLength: number = 0;
  viewInitialized = false;
  private isDragging = false;
  initX: number = 0;
  playTimeout!: ReturnType<typeof setTimeout>;
  delayTimeout!: ReturnType<typeof setTimeout>;
  resizingLeft: boolean = false;
  resizingRight: boolean = false;
  fullLength: number = 0;


  constructor(private renderer: Renderer2, private fileService: FileService) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);


  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.key === 'Delete' || event.key === 'Del') && this.isSelected) { // 'Del' might be used by some browsers
      this.del.emit();
    }
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
    if (this.masterRole === 'admin' || this.masterRole === 'manager') {
      if (!this.resizingLeft && !this.resizingRight) {
        this.isDragging = true;
        this.initX = event.clientX;
      } else if (this.resizingLeft || this.resizingRight) {
        this.initX = event.clientX;
      }

      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
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
    if (this.isDragging)
      this.XChange.emit(this.X);

    if (this.resizingLeft) {
      this.startTimeChange.emit(this.startTime);
      this.XChange.emit(this.X);
    }

    if (this.resizingRight)
      this.endTimeChange.emit(this.endTime);

    this.isDragging = false;
    this.resizingLeft = false;
    this.resizingRight = false;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    
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
      

      const wavesurfer = WaveSurfer.create({
        container: `#waveform${this.id}`,
        waveColor: '#1E3A5F',
        progressColor: '#1E3A5F',
        cursorWidth: 0,
        backend: 'MediaElement',
        minPxPerSec: 100
      })

      wavesurfer.load(response.url);
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
      const tempStartTime = (this.markerX - this.X) / this.multiplier / 100;
      this.audio.currentTime += tempStartTime;
      console.log(this.audio.currentTime);
      this.audio.play();
      this.playTimeout = setTimeout(() => this.stopAudio()
      , (this.audio.duration - this.startTime - tempStartTime - this.endTime) * 1000);
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
      this.getLength();
      console.log(this.startTime * 100, this.X)
    }
  }

  getLength() {
    this.audio.addEventListener('loadedmetadata', () => {
      console.log(this.multiplier + "<----");
      this.audioLength = (this.audio.duration - this.startTime - this.endTime) * 100 * this.multiplier;
      this.fullLength = this.audio.duration * 100 * this.multiplier;
    });
    this.audioLength = (this.audio.duration - this.startTime - this.endTime) * 100 * this.multiplier;
  }

  setTranslateStyle() {
    const translation = `translateX(${this.X * this.multiplier}px)`; // Use the X input for translation
    this.renderer.setStyle(this.ref.nativeElement, 'transform', translation);
  }

  // Selection function
  selected() {
    if (this.masterRole === 'admin' || this.masterRole === 'manager') {
      this.isSelected = true;
    }
  }

  notSelected() {
    this.isSelected = false;
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
