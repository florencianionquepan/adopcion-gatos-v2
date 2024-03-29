import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GatoDetalle } from '../models/GatoDetalle';
import { Cuota } from '../models/Cuota';
import { Padrino } from '../models/Padrino';
import { Observable, catchError, map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {
  public apiCuotas=`${environment.url}/cuotas`;

  constructor(private http:HttpClient) { }

  //la primera vez que paga una cuota
  pagarCuota(email:string,gato:GatoDetalle):Observable<any>{
    let cuota=new Cuota();
    let padrino=new Padrino();
    padrino.email=email;
    cuota.padrino=padrino;
    cuota.gato=gato;
    cuota.montoMensual=gato.montoMensual;
    return this.http.post(`${this.apiCuotas}`,cuota).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
          window.open(response.data,'_blank');
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

  getCuotasByEmail(email:string):Observable<any>{
    return this.http.get(`${this.apiCuotas}/padrino/${email}`).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
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

  pagarCuotaRechazadaoDesconocida(preferencia_id:string):Observable<any>{
    return this.http.get(`${this.apiCuotas}/preferencia/${preferencia_id}`).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
          window.open(response.data,'_blank');
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        throw error;
      })
    )
  }

  pagarCuotaPendiente(id:number):Observable<any>{
    return this.http.get(`${this.apiCuotas}/pendiente/${id}`).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
          window.open(response.data,'_blank');
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        throw error;
      })
    )
  }

  actualizarCuotas():Observable<any>{
    return this.http.get(`${this.apiCuotas}/actualizacion`).pipe(
      map((response:any) => {
        if (response.success) {
          console.log(response.data);
          if(response.data.length==0){
            Swal.fire({title:'No hay cuotas que actualizar'})
          }else if(response.data.length>0){
            let cant=response.data.length;
            Swal.fire({title: cant+ ' cuota/s creadas correctamente!',icon:'success'});
          }
        } else {
          throw new Error(response);
        }
      }),
      catchError((error: any) => {
        throw error;
      })
    )
  }

  getAll():Observable<any>{
    return this.http.get(`${this.apiCuotas}`).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
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

  getByEstado(estado:string):Observable<any>{
    return this.http.get(`${this.apiCuotas}/estado/${estado}`).pipe(
      map((response:any) => {
        if (response.success) {
          //console.log(response.data);
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
