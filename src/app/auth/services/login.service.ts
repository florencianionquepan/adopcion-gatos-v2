import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  validateLoginDetails(user:User):Observable<any>{
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(`${environment.url}/auth`,{observe:'response',withCredentials:true})
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(()=>err);
      })
    )
  }
}
