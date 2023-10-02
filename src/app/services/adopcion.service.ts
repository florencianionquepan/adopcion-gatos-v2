import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
}
