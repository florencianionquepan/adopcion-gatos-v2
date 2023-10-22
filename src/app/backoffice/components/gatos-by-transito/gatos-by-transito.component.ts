import { Component } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-gatos-by-transito',
  templateUrl: './gatos-by-transito.component.html',
  styleUrls: ['./gatos-by-transito.component.css']
})
export class GatosByTransitoComponent {
  gatos:GatoDetalle[]=[];

  constructor(){
    
  }

}
