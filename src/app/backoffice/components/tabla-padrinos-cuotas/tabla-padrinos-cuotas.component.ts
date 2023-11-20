import { Component, Input, SimpleChanges } from '@angular/core';
import { Cuota } from 'src/app/models/Cuota';
import { Padrino } from 'src/app/models/Padrino';

@Component({
  selector: 'app-tabla-padrinos-cuotas',
  templateUrl: './tabla-padrinos-cuotas.component.html',
  styleUrls: ['./tabla-padrinos-cuotas.component.css']
})
export class TablaPadrinosCuotasComponent {
  @Input() cuotas:Cuota[]=[];

}
