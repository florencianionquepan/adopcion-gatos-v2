import { Component } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-gatos-by-voluntario',
  templateUrl: './gatos-by-voluntario.component.html',
  styleUrls: ['./gatos-by-voluntario.component.css']
})
export class GatosByVoluntarioComponent {
  public gatos:GatoDetalle[]=[];
}
