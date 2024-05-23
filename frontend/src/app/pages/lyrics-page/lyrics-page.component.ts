import { Component, ViewChild, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { LyricsService } from '../../services/lyrics.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RhymeFinderComponent } from '../../components/rhyme-finder/rhyme-finder.component';
import { WordsFinderComponent } from '../../components/words-finder/words-finder.component';
import { LyricsComponent } from '../../components/lyrics/lyrics.component';

@Component({
  selector: 'app-lyrics-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatMenuModule, MatButtonModule, RhymeFinderComponent, WordsFinderComponent, LyricsComponent],
  templateUrl: './lyrics-page.component.html',
  styleUrl: './lyrics-page.component.scss',
  //encapsulation: ViewEncapsulation.None
})
export class LyricsPageComponent {

  
}
