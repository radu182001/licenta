import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LyricsService } from '../../services/lyrics.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-lyrics',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './lyrics.component.html',
  styleUrl: './lyrics.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LyricsComponent implements OnInit {
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  isSaved: boolean = true;

  suggestions: any = "";
  text: string = "";
  htmlContent: any = '';
  innerText: any = '';

  projectId: number = 0;
  role: string = "";

  position = { top: 0, left: 0 };

  constructor(
    private lyricsService: LyricsService, 
    private renderer: Renderer2, 
    private sanitizer: DomSanitizer, 
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private socketService: SocketService
  ) {}

  insertSection(title: string) {
    const sectionHtml = `<div contenteditable="false" class="section" style="color: #971717;"><b>---- ${title} ----</b></div><br><br>`;
    const container = this.textarea.nativeElement;
    const currentContent = container.innerHTML;
    const updatedContent = currentContent + sectionHtml;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(updatedContent);
    this.isSaved = false;
  }

  updateContent() {
    const container = this.textarea.nativeElement;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(container.innerHTML);
  }

  saveChanges() {
    this.lyricsService.updateLyrics(this.projectId, this.htmlContent.changingThisBreaksApplicationSecurity)
      .subscribe((response: any) => {
        this.isSaved = true;
        
      })
    
  }

  write() {
    this.isSaved = false;
    this.socketService.emit("newContent", {projectId: this.projectId, content: this.textarea.nativeElement.innerHTML});
  }

  generatePDF() {
    // Retrieve the text property of the element 
    console.log(this.htmlContent.changingThisBreaksApplicationSecurity)
    this.lyricsService.generatePDF(this.htmlContent.changingThisBreaksApplicationSecurity, 'lyrics.pdf')
  }

  connect() {
    this.socketService.connect();

    this.socketService.listen(`newContent/${this.projectId}`).subscribe((data) => {
      console.log("newContent", data.content);
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(data.content)
    })
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      if (isNaN(this.projectId)) {
        console.error("Project ID is not available or invalid");
      } else if (typeof localStorage !== 'undefined') { 
        this.lyricsService.getLyrics(this.projectId).subscribe((response: any) => {
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(response.content);
          this.connect();
        })

        this.projectService.getRole(this.projectId).subscribe((response: any) => {
          this.role = response.role;
        });
      }
    });
  }

}
