import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, filter, map, switchMap, take, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Notificacion } from '../models/Notificacion';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public apiNotificaciones=`${environment.url}/notificaciones`;
  private notificacionesSubject = new BehaviorSubject<Notificacion[]>([]);
  notificaciones$: Observable<Notificacion[]> = this.notificacionesSubject.asObservable();

  constructor(private http:HttpClient, private router:Router) {
  }

  public actualizarNotificaciones(email:string):Observable<Notificacion[]> {
    return this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      take(1),
      switchMap(() => {
        return this.obtenerNotificaciones(email);
      }),
      tap((notificaciones) => {
        this.notificacionesSubject.next(notificaciones);
      })
    );
  }

  obtenerNotificaciones(email: string): Observable<Notificacion[]> {
  return this.http.get(`${this.apiNotificaciones}/persona/${email}`).pipe(
    map((response:any) => {
      //console.log(response);
      if (response.success) {
        return response.data; 
      } else {
        throw new Error('Error al obtener las notificaciones');
      }
    }),
    catchError((error) => {
      console.error('Error en la solicitud:', error);
      throw error;
    })
  );
  }

  //aca mando solo las no leidas, para que se seteen como leidas
  public setearNotiLeidas(notificaciones:Notificacion[]):Observable<Notificacion[]>{
    return this.http.put(`${this.apiNotificaciones}/leidas`,notificaciones).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error('Error al obtener las notificaciones');
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    )
  }
}
