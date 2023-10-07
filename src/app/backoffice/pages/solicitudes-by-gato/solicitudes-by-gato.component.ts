import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitudes-by-gato',
  templateUrl: './solicitudes-by-gato.component.html',
  styleUrls: ['./solicitudes-by-gato.component.css']
})
export class SolicitudesByGatoComponent {
  public nombreGatito:string='';

  constructor(){
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    }
  }

}
