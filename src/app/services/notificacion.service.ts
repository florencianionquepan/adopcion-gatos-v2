import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public apiNotificaciones=`${environment.url}/notificaciones`;
  public user:User=new User;

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem('userdetails')){
      this.user=JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  public listarTodas():Observable<any>{
    return this.http.get(`${this.apiNotificaciones}/persona/${this.user.email}`)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }
}
