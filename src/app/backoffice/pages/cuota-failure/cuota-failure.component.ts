import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { CuotasPageComponent } from '../cuotas-page/cuotas-page.component';

@Component({
  selector: 'app-cuota-failure',
  templateUrl: './cuota-failure.component.html',
  styleUrls: ['./cuota-failure.component.css']
})
export class CuotaFailureComponent {
  user:User=new User();

  constructor(private router:Router){
    //esto es para cuando no era padrino y lo es por primera vez
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      if(!this.user.esPadrino){
        this.user.esPadrino=true;
        sessionStorage.setItem('userdetails', JSON.stringify(this.user));
      }
    }
  }

  ngOnInit(){
    Swal.fire({
      icon:'info',
      title:'Tu pago se registro como rechazado!',
      text:'Seras redirigido a tus cuotas...',
      timer:2000
    });
    setTimeout(() => {
      //redirigimos a cuotas
      this.router.navigate(['backoffice/miscuotas']);
    }, 2000);
  }

}
