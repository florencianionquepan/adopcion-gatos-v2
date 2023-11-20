import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cuota } from '../models/Cuota';
import { GatoDetalle } from '../models/GatoDetalle';
import { Padrino } from '../models/Padrino';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadrinoService {
  public apiPadrinos=`${environment.url}/padrinos`;

  constructor(private http:HttpClient) {}


  renunciarApadrinamiento(gato:GatoDetalle,email:string):Observable<any>{
    return this.http.put(`${this.apiPadrinos}/${email}`,gato).pipe(
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

  //cuando el padrino no pago, se lo renuncia automaticamente
  renunciaAutomatica(dni:string):Observable<any>{
    //let idPadrino=gato.padrino?.id;
    return this.http.get(`${this.apiPadrinos}/${dni}/cuotas`).pipe(
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
