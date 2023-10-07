import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GatoDetalle } from '../models/GatoDetalle';
import { FichaVeterinaria } from '../models/FichaVeterinaria';
import { Padrino } from '../models/Padrino';
import { Transito } from '../models/Transito';

@Injectable({
  providedIn: 'root'
})
export class GatosService {
  public apiGatos=`${environment.url}/gatos`;
  
  constructor(private http:HttpClient) {
   }

  public verGatos():Observable<any>{
    return this.http.get<any>(this.apiGatos);
  }

  public getGatoById(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/${id}`);
  }

  public gatosByVoluntario(email:string):Observable<any>{
    return this.http.get<any>(`${this.apiGatos}/voluntarios/${email}`,{withCredentials:true});
  }

  
  public nuevoGato(gato:GatoDetalle, fotos: File[]):Observable<any>{
    const formData=this.armarForm(gato,fotos);
    return this.http.post<any>(this.apiGatos, formData)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

  public edicionGato(gato:GatoDetalle, fotos:File[], id:number):Observable<any>{
    const formData=this.armarForm(gato,fotos);
    return this.http.put<any>(`${this.apiGatos}/${id}`, formData)
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
    pdf?ficha.pdf='':'';
    fichaData.append('ficha',JSON.stringify(ficha));
    //console.log(pdf);
    pdf?fichaData.append('pdf',pdf):'';
    return this.http.put<any>(`${this.apiGatos}/${id}/ficha`,fichaData)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

  private armarForm(gato:GatoDetalle,fotos:File[]):FormData{
    const formData=new FormData();
    formData.append('dto',JSON.stringify(gato));
    for(const k in fotos){
      const file=fotos[k];
      formData.append('multipartFiles',file);
    }
    return formData;
  }

  public asignarTransito(transito:Transito, idGato:number):Observable<any>{
    return this.http.put<any>(`${this.apiGatos}/${idGato}/transito`, transito)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

}
