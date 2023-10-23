import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransitoService {
  public apiTransitos=`${environment.url}/transitos`;

  constructor(private http:HttpClient) { }

  public verTransitos():Observable<any>{
    return this.http.get<any>(this.apiTransitos)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err.error);
      })
    )
  }

  public gatosByTransito(email:string):Observable<any>{
    return this.http.get<any>(`${this.apiTransitos}/${email}/gatos`).pipe(
      map((response:any) => {
        if (response.success) {
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
