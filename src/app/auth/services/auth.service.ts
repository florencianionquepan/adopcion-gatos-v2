import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new User();
  urlPrevia:string|null=null;

  constructor(private router:Router) { 
    if(localStorage.getItem('userdetails')){
      this.user = JSON.parse(localStorage.getItem('userdetails')!);
    }
  }

  getUser(): User {
    return this.user; // o puedes devolver null o cualquier valor predeterminado si el usuario no está definido
  }

  alertLogin():void{
    Swal.fire({
      title: 'Debes iniciar sesión para esta acción',
      showCancelButton: true,
      confirmButtonText: 'Ir a Login',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    })
  }

  setUrlActual():void{
    const currentUrl = this.router.url;
    localStorage.setItem('urlActual',currentUrl);
  }

  getUrlPrevia():string{
    const urlPrevia=localStorage.getItem("urlActual") || '/';
    return urlPrevia;
  }

  eliminarUrlPrevia():void{
    if(localStorage.getItem("urlActual")){
      localStorage.removeItem("urlActual");
    }
  }
}
