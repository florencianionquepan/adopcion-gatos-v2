import { Component, Input } from '@angular/core';
import { Estado } from 'src/app/models/Estado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-estados',
  templateUrl: './tabla-estados.component.html',
  styleUrls: ['./tabla-estados.component.css']
})
export class TablaEstadosComponent {
  @Input() estados:Estado[]=[];

  verMotivo(motivo:string){
    Swal.fire({text:motivo});
  }
}
