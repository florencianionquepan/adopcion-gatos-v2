import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Gato } from '../models/gato';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { GatoDetalle } from '../models/GatoDetalle';
import { FichaVeterinaria } from '../models/FichaVeterinaria';

@Injectable({
  providedIn: 'root'
})
export class GatosService {
  public cats:Gato[];
  public apiGatos=`${environment.url}/gatos`;
  
  constructor(private http:HttpClient) {
    this.cats=[];
   }

  public verGatos():Observable<any>{
    return this.http.get<any>(this.apiGatos);
  }

  public getGatoById(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/${id}`);
  }

  public gatosByVoluntario(email:string):Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/voluntarios/${email}`);
  }

  
  public nuevoGato(gato:GatoDetalle, fotos: File[]):Observable<any>{
    const formData=new FormData();
    formData.append('dto',JSON.stringify(gato));
    for(const k in fotos){
      const file=fotos[k];
      formData.append('multipartFiles',file);
    }
    return this.http.post<any>(this.apiGatos, formData)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

  public getFicha(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/${id}/ficha`)
    .pipe(catchError(err=>{
      console.log(err);
      return throwError(()=>err.error)
    }))
  }

  public asignarFicha(id:number,pdf:File | undefined,ficha:FichaVeterinaria):Observable<any>{
    const fichaData=new FormData();
    ficha.id=0;
    ficha.pdf='';
    fichaData.append('ficha',JSON.stringify(ficha));
    console.log(pdf);
    pdf?fichaData.append('file',pdf):'';
    return this.http.put<any>(`${this.apiGatos}/${id}/ficha`,fichaData)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

}
