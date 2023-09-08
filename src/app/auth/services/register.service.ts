import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Registro } from 'src/app/models/Registro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public id:number;
  public token:string;

  constructor(private http:HttpClient) {
    this.id=0;
    this.token='';
   }

  register(registro:Registro):Observable<any>{
    return this.http.post(`${environment.url}/personas`,registro)
    .pipe(
      catchError(err=>{
        //console.log(err);
        return throwError(()=>err.error)
      })
    )
  }

  validate(id:number, token:string):Observable<any>{
    return this.http.get(`${environment.url}/usuarios/${id}/validacion/${token}`)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error)
      })
    )
  }
}
