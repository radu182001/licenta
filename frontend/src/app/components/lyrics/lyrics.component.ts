import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LyricsService } from '../../services/lyrics.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-lyrics',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatMenuModule, MatButtonModule, MatDividerModule],
  templateUrl: './lyrics.component.html',
  styleUrl: './lyrics.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LyricsComponent {
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  isSaved: boolean = false;

  suggestions: any = "";
  text: string = "";
  htmlContent: any = '';
  innerText: any = '';

  position = { top: 0, left: 0 };

  constructor(private lyricsService: LyricsService, private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  insertSection(title: string) {
    const sectionHtml = `<div contenteditable="false" class="section" style="color: #971717;"><b>---- ${title} ----</b></div><br><br>`;
    const container = this.textarea.nativeElement;
    const currentContent = container.innerHTML;
    const updatedContent = currentContent + sectionHtml;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(updatedContent);
  }

  updateContent() {
    const container = this.textarea.nativeElement;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(container.innerHTML);
  }

  saveChanges() {
    this.isSaved = true
  }

  generatePDF() {
    // Retrieve the text property of the element 
    console.log(this.htmlContent.changingThisBreaksApplicationSecurity)
    this.lyricsService.generatePDF(this.htmlContent.changingThisBreaksApplicationSecurity, 'lyrics.pdf')
  }

}
