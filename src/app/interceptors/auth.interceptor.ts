import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user=new User();

  constructor(private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.url.startsWith(environment.url)){
      let httpHeaders=new HttpHeaders();
      if(localStorage.getItem('userdetails')){
        this.user=JSON.parse(localStorage.getItem('userdetails')!);
      }
      if(this.user && this.user.password && this.user.email){
        httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.user.email + ':' + this.user.password));
        localStorage.setItem('userdetails','');
      }else{
        let authorization=localStorage.getItem('Authorization');
        if(authorization){
          httpHeaders = httpHeaders.append('Authorization', authorization); 
        }
      }
      let xsrf = localStorage.getItem('XSRF-TOKEN');
      if(xsrf){
        httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
      }
      httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
      const xhr = req.clone({
        headers: httpHeaders
      });
      return next.handle(xhr).pipe(
        tap({
          error:(e) => {
            //console.log(e);
            if (e instanceof HttpErrorResponse) {
              if (e.status !== 401) {
                return;
              }
              if(e.error?.message.includes('token')){
                this.alertError(e);
                localStorage.clear();
                this.router.navigate(['/login']);
              }
            }
          }
        }));
    }else{
      return next.handle(req);
    }
  }

  alertError(error:any):void{
    Swal.fire({
      icon:'error',
      title:'Error '+error.status+': '+error.error?.message,
      text:'Vuelve a iniciar sesión'
    });
  }
    
}
