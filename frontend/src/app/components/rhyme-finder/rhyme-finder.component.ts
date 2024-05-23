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
  selector: 'app-rhyme-finder',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, CommonModule, FormsModule, MatButtonModule, MatMenuModule, MatChipsModule, MatTooltipModule],
  templateUrl: './rhyme-finder.component.html',
  styleUrl: './rhyme-finder.component.scss'
})
export class RhymeFinderComponent {
  word: string = "";
  selectedNumSyllables: number = 0;
  numSyllables: any;
  results: any = [];


  constructor(private lyricsService: LyricsService) {
    this.numSyllables = Array(6).fill(0).map((x,i)=>i);
  }

  findRhymes() {
    this.word = this.word.split(" ")[0];
    this.lyricsService.getRhymes(this.word, this.selectedNumSyllables).subscribe((response: any) => {
      this.results = response.data;
      console.log(response.data)
    })
  }

  selectSyllables(i: number) {
    this.selectedNumSyllables = i + 1;

    if (this.word && this.word.trim() !== '') {
      this.findRhymes();
    }
  }

}
