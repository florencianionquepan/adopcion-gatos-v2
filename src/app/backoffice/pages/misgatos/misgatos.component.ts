import { Component } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-misgatos',
  templateUrl: './misgatos.component.html',
  styleUrls: ['./misgatos.component.css']
})
export class MisgatosComponent {
  public gatos:GatoDetalle[]=[];

  constructor(){
    
  }

}
