import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-transito-page',
  templateUrl: './asignacion-transito-page.component.html',
  styleUrls: ['./asignacion-transito-page.component.css']
})
export class AsignacionTransitoPageComponent {
  public idGato:number;
  public nombreGatito:string='';

  constructor(private actiRoute:ActivatedRoute){
    this.idGato=this.actiRoute.snapshot.params['id'];
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    }
  }

  ngOnInit(){

  }

  asignarTransito(transitoData: { id: number, nombre: string }):void{
    const { id, nombre } = transitoData;
    //console.log(id, nombre);
    this.alertaAsignacion(nombre,this.nombreGatito);
  }

  alertaAsignacion(transito:string,gatito:string){
    Swal.fire({
      title: `Antes de asignarle a ${transito} el gatito ${gatito}`,
      text: `Asegúrese de que ya se contactó al tránsito ${transito} y se acordó previamente. 
      Esta acción es instantánea y mostrará la ubicación del gatito como la de su tránsito`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Asignar transito'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Genial!',
          `El gatito ${gatito} está a cargo de ${transito}`,
          'success'
        )
      }
    })
  }

}
