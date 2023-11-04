import { Component, Input } from '@angular/core';
import { Cuota, EstadoPago } from 'src/app/models/Cuota';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { User } from 'src/app/models/user';
import { CuotasService } from 'src/app/services/cuotas.service';
import { PadrinoService } from 'src/app/services/padrino.service';

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
            private padrinoser:PadrinoService){}

  ngOnInit(){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  pagar(idpref:string){
    this.service.pagarCuotaPendiente(idpref).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }

  renunciarApadrinamiento(gato:GatoDetalle){
    //mensaje de advertenciaa!!!
    this.padrinoser.renunciarApadrinamiento(gato, this.user.email).subscribe(
      (data)=>{
        console.log(data);
        //este gatito ya no forma parte de tu listado
      }
    )
  }
}
