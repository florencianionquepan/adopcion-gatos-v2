import { Component } from '@angular/core';
import { Transito } from 'src/app/models/Transito';
import { TransitoService } from 'src/app/services/transito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-transitos',
  templateUrl: './tabla-transitos.component.html',
  styleUrls: ['./tabla-transitos.component.css']
})
export class TablaTransitosComponent {
transitos: Transito[]=[];

  constructor(private service:TransitoService){
    this.service.verTransitos()
    .subscribe({
      next:(response)=>{
        //console.log(response.data);
        this.transitos=response.data;
      },
      error:(e)=>{
        //console.error("Error al enviar la ficha", e);
        Swal.fire({title:'Error',icon:'error',text:e.mensaje})
      }
    }
    )
  }
}
