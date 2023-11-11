import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transito } from 'src/app/models/Transito';
import { GatosService } from 'src/app/services/gatos.service';
import { TransitoService } from 'src/app/services/transito.service';
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
  public icono:string='';
  filtroTransitos: string = '';
  transitos:Transito[]=[];

  constructor(private actiRoute:ActivatedRoute,
    private gatoservice:GatosService,
    private service:TransitoService){
    this.idGato=this.actiRoute.snapshot.params['id'];
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    } if(state && state.transito){
      this.transitoActual=state.transito;
    } if(state && state.icono){
      this.icono=state.icono;
    }
  }

  ngOnInit(){
    this.getTransitos();
  }

  private getTransitos(){
    this.service.verTransitos()
    .subscribe({
      next:(response)=>{
        //console.log(response.data);
        this.transitos=response.data;
      },
      error:(e)=>{
        Swal.fire({title:'Error',icon:'error',text:e.mensaje})
      }
    }
    )
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
          next:(gatoactual)=>{
            //console.log(gatoactual);
            this.transitoActual=gatoactual.transito;
            this.getTransitos();
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
