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
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
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
}
