import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user=new User();

  constructor(private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.url.startsWith(environment.url)){
      let httpHeaders=new HttpHeaders();
      if(sessionStorage.getItem('userdetails')){
        this.user=JSON.parse(sessionStorage.getItem('userdetails')!);
      }
      if(this.user && this.user.password && this.user.email){
        httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.email + ':' + this.user.password));
        sessionStorage.setItem('userdetails','');
      }else{
        let authorization=sessionStorage.getItem('Authorization');
        if(authorization){
          httpHeaders = httpHeaders.append('Authorization', authorization); 
        }
      }
      let xsrf = sessionStorage.getItem('XSRF-TOKEN');
      if(xsrf){
        httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
      }
      httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
      const xhr = req.clone({
        headers: httpHeaders
      });
      return next.handle(xhr).pipe(tap(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.router.navigate(['/']);
          }
        }));
    }else{
      return next.handle(req);
    }
  }
    
}
