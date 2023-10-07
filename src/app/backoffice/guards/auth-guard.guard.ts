import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let userdetails = sessionStorage.getItem('userdetails');
      //console.log(authStatus);
      if(userdetails) {
        //const userDetails = JSON.parse(userdetails);
        //const authStatusValue = userDetails.authStatus;
        return true;
      }
      else{
        this.router.navigate(['/']);
        /* Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes estar registrado para acceder a esta url.',
          timer:2000,
        })
        setTimeout(()=>{
            //this.router.navigate(['/']);
        },2000) */
        return false;
      }
  }
  
}