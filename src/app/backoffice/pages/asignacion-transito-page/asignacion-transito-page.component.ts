import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transito } from 'src/app/models/Transito';
import { GatosService } from 'src/app/services/gatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-transito-page',
  templateUrl: './asignacion-transito-page.component.html',
  styleUrls: ['./asignacion-transito-page.component.css']
})
export class AsignacionTransitoPageComponent {
  public idGato:number;
  public nombreGatito:string='';
  public transitoActual:Transito=new Transito();
  filtroTransitos: string = '';

  constructor(private actiRoute:ActivatedRoute,
    private gatoservice:GatosService){
    this.idGato=this.actiRoute.snapshot.params['id'];
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    } if(state && state.transito){
      this.transitoActual=state.transito;
    }
  }

  asignarTransito(transitoData: { id: number, nombre: string }):void{
    const transito=new Transito();
    transito.id=transitoData.id;
    transito.nombre=transitoData.nombre;
    //console.log(id, nombre);
    this.alertaAsignacion(transito,this.nombreGatito);
  }

  alertaAsignacion(transito:Transito,gatito:string){
    Swal.fire({
      title: `Antes de asignarle a ${transito.nombre} el gatito ${gatito}`,
      text: `Asegúrese de que ya se contactó al tránsito ${transito.nombre} y se acordó previamente. 
      Esta acción es instantánea y mostrará la ubicación del gatito como la de su tránsito`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Asignar transito'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gatoservice.asignarTransito(transito,this.idGato)
        .subscribe({
          next:(response)=>{
            console.log(response.data);
            Swal.fire(
              'Genial!',
              `El gatito ${gatito} está a cargo de ${transito.nombre}`,
              'success'
            )
          },
          error:(e)=>{
            //console.error("Error al obtener los datos", e);
            Swal.fire({
              icon:'error',
              title:'Error '+e.estado,
              text:e.mensaje
            })
          }
        })
      }
    })
  }

}
