import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TokenHandleService {

  constructor(private webService: WebRequestService) { }

  validateToken(): Observable<string | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null); // Return an observable with null if no token is found
    }
  
    // Make the HTTP request to validate the token
    return this.webService.post('/api/auth/validateToken', { token }).pipe(
      map((response: any) => {
        console.log(response);
        if (response.msg) {
          return token; // Return the token if it's valid
        } else {
          return null; // Return null if the token is not valid
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(null); // Return null if there's an error during the request
      })
    );
  }

}
