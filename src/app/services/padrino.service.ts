import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cuota } from '../models/Cuota';
import { GatoDetalle } from '../models/GatoDetalle';
import { Padrino } from '../models/Padrino';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadrinoService {
  public apiCuotas=`${environment.url}/cuotas`;

  constructor(private http:HttpClient) {}

  pagarCuota(email:string,gato:GatoDetalle):Observable<any>{
    let cuota=new Cuota();
    let padrino=new Padrino();
    padrino.email=email;
    cuota.padrino=padrino;
    cuota.gato=gato;
    cuota.monto=gato.montoMensual;
    return this.http.post(`${this.apiCuotas}`,cuota).pipe(
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
