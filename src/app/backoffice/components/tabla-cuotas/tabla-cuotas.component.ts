import { Component, Input } from '@angular/core';
import { Cuota, EstadoPago } from 'src/app/models/Cuota';

@Component({
  selector: 'app-tabla-cuotas',
  templateUrl: './tabla-cuotas.component.html',
  styleUrls: ['./tabla-cuotas.component.css']
})
export class TablaCuotasComponent {
  @Input() cuotas:Cuota[]=[];
  EstadoPago: EstadoPago=EstadoPago.DESCONOCIDO;
}
