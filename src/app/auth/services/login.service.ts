import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { getCookie } from 'typescript-cookie';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:User=new User();

  constructor(private http:HttpClient,private router:Router) { }

  validateLoginDetails(user:User):Observable<any>{
    window.localStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(`${environment.url}/auth`,{observe:'response',withCredentials:true}).pipe(
      map((response:any) => {
        //console.log(response);
        if (response.status==200) {
          if(response.headers){
            window.localStorage.setItem("Authorization",response.headers.get("Authorization")!);
          }
          let xsrf= getCookie('XSRF-TOKEN')!;
          window.localStorage.setItem("XSRF-TOKEN",xsrf);
          this.user=response.body.data;
          this.user.authStatus="AUTH";
          window.localStorage.setItem('userdetails',JSON.stringify(this.user));
          return this.user; 
        } else {
          throw new Error(response);
        }
      }),
      catchError((response)=>{
          if(response.error!=null){
            let error=response.error;
            Swal.fire({
              'title':error.message,
              'icon':'error',
              didClose:()=>{
                if (error.key == 'bloqueado') {
                  this.router.navigate(['/']);
                }
              }
            });
        }else{
          Swal.fire({'title':'Credenciales invalidas','icon':'error'});
        } 
        throw response;
      })
    )
  }
}
