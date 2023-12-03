import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public apiUsuarios=`${environment.url}/usuarios`;

  constructor(private http:HttpClient) { }

  public getUsuarios():Observable<any>{
    return this.http.get(`${this.apiUsuarios}`).pipe(
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

  //bloqueado o desbloqueado
  public habilitadoUsuario(id:number, motivo:string, estado:string):Observable<any>{
    const usuario=new Usuario();
    usuario.motivo=motivo;
    return this.http.put(`${this.apiUsuarios}/${id}/${estado}`,usuario).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        Swal.fire({title:'Error '+error.error.estado,
                  text:error.error.mensaje,
                  icon:'error'})
        throw error;
      })
    )
  }

  public crearAdmin(id:number):Observable<any>{
    return this.http.get(`${this.apiUsuarios}/${id}/rol/socio`).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.success) {
          return response.data; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((error) => {
        Swal.fire({title:'Error ',
                  text:error.error.mensaje,
                  icon:'error'})
        throw error;
      })
    )
  }
}
