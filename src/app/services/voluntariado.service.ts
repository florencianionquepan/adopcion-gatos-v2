import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../models/Solicitud';
import { Persona } from '../models/Persona';
import { SolicitudVoluntariado } from '../models/SolicitudVoluntariado';
import { Observable, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoService {
  public apiTransitos=`${environment.url}/voluntariados`;

  constructor(private http:HttpClient) { }

  public enviarSolicitud(email:string, tipo:string):Observable<any>{
    let aspirante=new Persona();
    aspirante.email=email;
    let solicitud=new SolicitudVoluntariado();
    solicitud.aspirante=aspirante;
    solicitud.voluntariado=tipo;
    return this.http.post(this.apiTransitos,solicitud,{observe:'response',withCredentials:true}).pipe(
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
        Swal.fire({
          title:'Error '+error.error.estado,
          text:error.error.mensaje,
          icon:'error'
        })
        throw error;
      })
    )
  }
}
