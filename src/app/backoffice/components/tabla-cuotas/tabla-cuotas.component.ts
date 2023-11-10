import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cuota, EstadoPago } from 'src/app/models/Cuota';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { User } from 'src/app/models/user';
import { CuotasService } from 'src/app/services/cuotas.service';
import { PadrinoService } from 'src/app/services/padrino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-cuotas',
  templateUrl: './tabla-cuotas.component.html',
  styleUrls: ['./tabla-cuotas.component.css']
})
export class TablaCuotasComponent {
  @Input() cuotas:Cuota[]=[];
  EstadoPago: EstadoPago=EstadoPago.DESCONOCIDO;
  user:User=new User();

  constructor(private service:CuotasService, 
            private padrinoser:PadrinoService, 
            private authService:AuthService){}

  ngOnInit(){
    this.user=this.authService.getUser();
  }

  pagar(idpref:string){
    this.alertPagar();
    setTimeout(()=>{
      this.service.pagarCuotaRechazadaoDesconocida(idpref).subscribe(
        (data)=>{
          console.log(data);
        }
      )
    },1500);
  }

  pagarPendiente(idCuota:number){
    this.alertPagar();
    setTimeout(()=>{
      this.service.pagarCuotaPendiente(idCuota).subscribe(
        (data)=>{
          console.log(data);
        }
      )
    },1500)
  } 

  renunciarApadrinamiento(gato:GatoDetalle){
    //mensaje de advertenciaa!!!
    this.padrinoser.renunciarApadrinamiento(gato, this.user.email).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          icon:'success',
          title:'Renuncia exitosa!',
          text:'Este gatito ya no forma parte de tu listado',
          timer:1500,
        })
      }
    )
  }

  alertPagar():void{
    Swal.fire({
      title: 'Seras redirigido a un sitio externo para realizar el pago...',
      icon: 'info',
      timer:2000,
      showConfirmButton:false
    })
  }
}
