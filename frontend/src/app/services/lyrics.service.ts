import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  constructor(private webReqService: WebRequestService) { }

  getLyrics(id: number) {
    return this.webReqService.get(`/api/lyrics/${id}`);
  }

  updateLyrics(id: number, content: string) {
    return this.webReqService.put(`/api/lyrics/${id}`, {content: content})
  }

  getSuggestions(text: string) {
    return this.webReqService.get(`/api/lyrics/suggestions?s=${text}`);
  }

  getRhymes(word: string, syllables: number) {
    return this.webReqService.get(`/api/lyrics/rhymes?w=${word}&syl=${syllables}`);
  }

  getSimilarWords(expression: string) {
    return this.webReqService.get(`/api/lyrics/similarWords?e=${expression}`);
  }

  generatePDF(content: string, fileName: string) {
    content = content.replace('</div>', '\n').replace(/<[^>]+>/g, '');

    const doc = new jsPDF();

    doc.text(content, 10, 10);
    doc.save(fileName);
  }
}
