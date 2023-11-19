import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
