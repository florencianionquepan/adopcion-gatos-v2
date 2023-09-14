import { Component, Input } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-tabla-gatos',
  templateUrl: './tabla-gatos.component.html',
  styleUrls: ['./tabla-gatos.component.css']
})
export class TablaGatosComponent {
  @Input() gatos:GatoDetalle[]=[];
}
