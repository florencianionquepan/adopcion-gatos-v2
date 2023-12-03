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
  public apiVoluntariados=`${environment.url}/voluntariados`;

  constructor(private http:HttpClient) { }

  public enviarSolicitud(email:string, tipo:string):Observable<any>{
    let aspirante=new Persona();
    aspirante.email=email;
    let solicitud=new SolicitudVoluntariado();
    solicitud.aspirante=aspirante;
    solicitud.voluntariado=tipo;
    return this.http.post(this.apiVoluntariados,solicitud,{observe:'response',withCredentials:true}).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.status==201) {
          return response.body; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        //console.error('Error en la solicitud:', error);
        Swal.fire({
          title:'Error ',
          text:error.error.mensaje,
          icon:'error'
        })
        throw error;
      })
    )
  }

  public listarByAspirante(email:string):Observable<any>{
    return this.http.get(`${this.apiVoluntariados}/aspirante/${email}`).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        throw error;
      })
    )
  }

  public listarTodas():Observable<any>{
    return this.http.get(`${this.apiVoluntariados}`).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        throw error;
      })
    )
  }

  public actualizarSolicitud(id:number, estado:string,motivo:string, email:string):Observable<any>{
    const soli=new SolicitudVoluntariado();
    const socio=new Persona();
    socio.email=email;
    soli.motivo=motivo;
    soli.socio=socio;
    return this.http.put(`${this.apiVoluntariados}/${id}/estados/${estado}`,soli).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        Swal.fire({
          title:'Error ',
          text:error.error.mensaje,
          icon:'error'
        });
        throw error;
      })
    )
  }

}
