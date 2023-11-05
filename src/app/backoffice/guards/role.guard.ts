import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol, User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userdetails = sessionStorage.getItem('userdetails');
      let user:User = JSON.parse(userdetails!);

      const allowedRoles = route.data['allowedRoles'];
      if(user && user.roles){
        if (user.roles.some(role=>allowedRoles.includes(role.nombre))) {
          return true; 
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tienes permisos para acceder a esta url.',
        timer:2000,
      })
      setTimeout(()=>{
          this.router.navigate(['/']);
      },2000)
      return false;
  }
  
}
