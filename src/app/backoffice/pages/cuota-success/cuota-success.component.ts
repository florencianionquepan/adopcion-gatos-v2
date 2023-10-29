import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PadrinoService } from 'src/app/services/padrino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuota-success',
  templateUrl: './cuota-success.component.html',
  styleUrls: ['./cuota-success.component.css']
})
export class CuotaSuccessComponent {
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
      icon:'success',
      title:'Tu pago se registro correctamente!',
      text:'Seras redirigido a tus cuotas...',
      timer:2000
    });
    setTimeout(() => {
      //redirigimos a gatos que apadrina...
      //this.router.navigate(['/']);
    }, 2000);
  }
}
