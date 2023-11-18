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
      let userdetails = localStorage.getItem('userdetails');
      let user:User = JSON.parse(userdetails!);

      const allowedRoles = route.data['allowedRoles'];
      const requiredAttributes = route.data['requiredAttributes'];
      if (user) {
        // Verificar roles
        if (allowedRoles && allowedRoles.length > 0 && user.roles.some(role => allowedRoles.includes(role.nombre))) {
          return true;
        }
  
        // Verificar atributos
        if (requiredAttributes && requiredAttributes.length > 0 && this.hasRequiredAttributes(user, requiredAttributes)) {
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

  private hasRequiredAttributes(user: User, requiredAttributes: string[]): boolean {
    return requiredAttributes && requiredAttributes.length > 0 && requiredAttributes.every(attr => (user as any)[attr] === true);
  }
  
}
