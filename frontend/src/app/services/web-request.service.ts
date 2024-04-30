import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    return this.http.get(this.ROOT_URL + url);
  }

  post(url: string, payload: Object, headers?: HttpHeaders) {
    return this.http.post(this.ROOT_URL + url, payload, {headers});
  }

  put(url: string, payload: Object, headers?: HttpHeaders) {
    return this.http.put(this.ROOT_URL + url, payload, {headers});
  }

  delete(url: string, payload?: Object) {
    return this.http.delete(this.ROOT_URL + url, payload);
  }
}
