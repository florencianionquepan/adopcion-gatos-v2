import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/models/Solicitud';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-tabla-solicitudes-adopcion',
  templateUrl: './tabla-solicitudes-adopcion.component.html',
  styleUrls: ['./tabla-solicitudes-adopcion.component.css']
})
export class TablaSolicitudesAdopcionComponent {
  idGato:number;
  solicitudes:Solicitud[]=[];
  

  constructor(private service:AdopcionService,
            private actiRoute:ActivatedRoute){
    this.idGato=this.actiRoute.snapshot.params['id'];
    this.service.listarByGato(this.idGato).subscribe(
      (response)=>{
        this.solicitudes=response;
      }
    )

  }

  aceptar(){

  }

  rechazar(){

  }
}
