import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuota-success',
  templateUrl: './cuota-success.component.html',
  styleUrls: ['./cuota-success.component.css']
})
export class CuotaSuccessComponent {

  constructor(private router:Router){

  }

  ngOnInit(){
    Swal.fire({
      icon:'success',
      title:'Tu pago se registro correctamente!',
      text:'Seras redirigido a tus cuotas...',
      timer:2000
    });
    setTimeout(() => {
      //this.router.navigate(['/']);
    }, 2000);
  }
}
