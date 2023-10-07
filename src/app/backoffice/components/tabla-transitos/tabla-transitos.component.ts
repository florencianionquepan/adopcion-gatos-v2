import { Component, EventEmitter, Output } from '@angular/core';
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
@Output() asignarTransitoEvent = new EventEmitter<{ id: number, nombre: string }>();

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

  asignarTransito(id: number, nombre: string) {
    this.asignarTransitoEvent.emit({ id, nombre });
  }
}
