import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitudes-by-gato',
  templateUrl: './solicitudes-by-gato.component.html',
  styleUrls: ['./solicitudes-by-gato.component.css']
})
export class SolicitudesByGatoComponent {
  public idGato:number;
  public nombreGatito:string='';

  constructor(private actiRoute:ActivatedRoute
    ){
    this.idGato=this.actiRoute.snapshot.params['id'];
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    }
  }

}
