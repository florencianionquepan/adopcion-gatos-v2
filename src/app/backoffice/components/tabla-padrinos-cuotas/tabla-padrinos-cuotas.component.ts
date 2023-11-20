import { Component, Input, SimpleChanges } from '@angular/core';
import { Cuota } from 'src/app/models/Cuota';
import { Padrino } from 'src/app/models/Padrino';
import { CuotasService } from 'src/app/services/cuotas.service';
import { PadrinoService } from 'src/app/services/padrino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-padrinos-cuotas',
  templateUrl: './tabla-padrinos-cuotas.component.html',
  styleUrls: ['./tabla-padrinos-cuotas.component.css']
})
export class TablaPadrinosCuotasComponent {
  @Input() cuotas:Cuota[]=[];

  constructor(private padriService:PadrinoService,
    private cuotasservice:CuotasService){

  }

  remover(dni:string){
    Swal.fire({
      title:'Esta seguro de remover el padrino del gatito?',
      text:'Se removerá el padrino del gato en los casos en que se cuenten con cuotas impagas que lleven 7 o 10 dias desde su creación',
      icon:'warning'
    }).then((result)=>{
      if(result.isConfirmed){
        this.padriService.renunciaAutomatica(dni).subscribe(
          (data)=>{
            console.log(data);
            if(data.length==0){
              Swal.fire("No se removió el padrino");
            }else{
              this.cuotasservice.getAll().subscribe(
                (data)=>{
                  this.cuotas=data;
                }
              )
            }
          }
        )
      }
    });
  }
  
}
