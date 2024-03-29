import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/models/Solicitud';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-solicitudes-by-gato',
  templateUrl: './solicitudes-by-gato.component.html',
  styleUrls: ['./solicitudes-by-gato.component.css']
})
export class SolicitudesByGatoComponent {
  public nombreGatito:string='';
  public idGatito:number;
  public icono:string='';
  solicitudes: Solicitud[]=[];

  constructor(private service:AdopcionService,
    private actiRoute:ActivatedRoute,){
    const state = history.state;
    this.idGatito=this.actiRoute.snapshot.params['id'];
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    }if(state && state.icono){
      this.icono=state.icono;
    }
  }

  ngOnInit(){
    this.service.listarByGato(this.idGatito).subscribe(
      (response)=>{
        this.solicitudes=response.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    );
  }

}
