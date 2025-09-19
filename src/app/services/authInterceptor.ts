import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);
  // const token = authService.getToken();
  
  // if (token) {
  //   const authReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${token}`)
  //   });
  //   return next(authReq);
  // }

  return next(req);
};
