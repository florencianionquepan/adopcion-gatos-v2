import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/Persona';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  public apiNotificaciones=`${environment.url}/personas`;
  constructor(private http:HttpClient) { }

  public listaVoluntariados(dni:string):Observable<any>{
    return this.http.get(`${this.apiNotificaciones}/${dni}/voluntariado`).pipe(
      map((response:any) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        throw error;
      })
    )
  }

  public obtenerDatos(email:string):Observable<any>{
    return this.http.get(`${this.apiNotificaciones}/search?email=${email}`).pipe(
      map((response:any) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        throw error;
      })
    )
  }

  public actualizarDatos(persona:Persona, id:number):Observable<any>{
    return this.http.put(`${this.apiNotificaciones}/${id}`, persona).pipe(
      map((response:any) => {
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        Swal.fire({icon:'error',title:`Error`,text:error.error.mensaje})
        throw error;
      })
    )
  }
}
