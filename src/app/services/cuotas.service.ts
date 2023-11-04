import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GatoDetalle } from '../models/GatoDetalle';
import { Cuota } from '../models/Cuota';
import { Padrino } from '../models/Padrino';
import { Observable, catchError, map } from 'rxjs';

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
}
