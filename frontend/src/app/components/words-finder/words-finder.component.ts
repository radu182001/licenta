import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { LyricsService } from '../../services/lyrics.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-words-finder',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, CommonModule, FormsModule, MatButtonModule, MatMenuModule, MatChipsModule, MatTooltipModule],
  templateUrl: './words-finder.component.html',
  styleUrl: './words-finder.component.scss'
})
export class WordsFinderComponent {

  word: string = "";
  results: any = [];

  constructor(private lyricsService: LyricsService) {}


  findWords() {
    this.lyricsService.getSimilarWords(this.word).subscribe((response: any) => {
      this.results = response.data;
    })
  }

}
