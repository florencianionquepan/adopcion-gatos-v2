import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../models/Solicitud';
import { Persona } from '../models/Persona';
import { GatoDetalle } from '../models/GatoDetalle';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  public apiSolicitud=`${environment.url}/solicitudes`;

  constructor(private http:HttpClient) { }

  public enviarSolicitud(idGato:number, email:string):Observable<any>{
    const gato=new GatoDetalle();
    gato.id=idGato;
    const solicitante=new Persona();
    solicitante.email=email;
    const nueva=new Solicitud(0,[],gato,solicitante);
    return this.http.post(this.apiSolicitud,nueva,{observe:'response',withCredentials:true})
    .pipe(
      catchError(err=>{
        //console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

  public listarByGato(id:number):Observable<any>{
    return this.http.get(`${this.apiSolicitud}/gato/${id}`).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    )
  }

  public actualizarSolicitud(id:number,estado:string,motivo:string):Observable<any>{
    const soli=new Solicitud();
    soli.motivo=motivo;
    return this.http.put(`${this.apiSolicitud}/${id}/estados/${estado}`,soli).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    )
  }

  public listarSoliAceptadas(dni:string):Observable<any>{
    return this.http.get(`${this.apiSolicitud}/aceptadas/solicitante/${dni}`).pipe(
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

  public listarSoliBySolicitante(email:string):Observable<any>{
    return this.http.get(`${this.apiSolicitud}/solicitante/${email}`).pipe(
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
}
