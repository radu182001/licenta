import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { take } from 'rxjs/operators';
import { Token } from '../utils/token';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  let token: string | null = "";

  token = localStorage.getItem('token');

  const newRequest = req.clone({
    setHeaders: {
      'x-auth': token || ''
    }
  });

  return next(newRequest);
};
