import { Component } from '@angular/core';
import { Cuota, EstadoPago } from 'src/app/models/Cuota';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { Padrino } from 'src/app/models/Padrino';
import { CuotasService } from 'src/app/services/cuotas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizacion-cuotas',
  templateUrl: './actualizacion-cuotas.component.html',
  styleUrls: ['./actualizacion-cuotas.component.css']
})
export class ActualizacionCuotasComponent {
  cuotas:Cuota[]=[];
  cuotasFiltradas:Cuota[]=[];
  padrinos:Padrino[]=[];
  gatos:GatoDetalle[]=[];
  estados:EstadoPago[]=[];
  
  constructor(private service:CuotasService){}

  ngOnInit(){
    this.getCuotas();
  }

  actualizarTodas(){
    this.service.actualizarCuotas().subscribe(
      (data)=>{
        //console.log(data);
        this.getCuotas();
        
      }
    )
  }

  getCuotas(){
    this.service.getAll().subscribe(
      (data)=>{
        console.log(data);
        this.cuotas=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.cuotasFiltradas=this.cuotas;
        this.obtenerOptionsEstadoPago();
        this.obtenerOptionsPadrino();
        this.obtenerOptionsGatos();
      }
    )
  }

  obtenerOptionsEstadoPago(){
    this.estados=[];
    this.cuotasFiltradas.forEach((cuota:any)=>{
      if(cuota.estadoPago && !this.estados.some((e:EstadoPago)=>e==cuota.estadoPago)){
        this.estados.push(cuota.estadoPago);
      }
    })
  }

  obtenerOptionsPadrino(){
    this.padrinos=[];
    this.cuotasFiltradas.forEach((cuota: any) => {
      if (cuota.padrino && !this.padrinos.some((p: Padrino) => p.dni === cuota.padrino.dni)) {
        this.padrinos.push(cuota.padrino);
      }
    });
  }

  obtenerOptionsGatos(){
    this.gatos=[];
    this.cuotasFiltradas.forEach((cuota:any)=>{
      if (cuota.gato && !this.gatos.some((g: GatoDetalle) => g.id === cuota.gato.id)) {
        this.gatos.push(cuota.gato);
      }
    })
  }

  onEstadoChange(event:any){
    const estadoSeleccionado = event.target.value;
    console.log(estadoSeleccionado);
    if(estadoSeleccionado=='Todas'){
      this.cuotasFiltradas=this.cuotas;
    }else{
      this.cuotasFiltradas=this.cuotas.filter(cuota=>cuota.estadoPago && cuota.estadoPago==estadoSeleccionado);
    }
  }

  onPadrinoChange(event: any) {
    const padrinodni = event.target.value;
    if(padrinodni=='all'){
      this.cuotasFiltradas=this.cuotas;
    }else{
      this.cuotasFiltradas=this.cuotas.filter(cuota => cuota.padrino && cuota.padrino.dni === padrinodni);
    }
    this.obtenerOptionsEstadoPago();
    this.obtenerOptionsGatos();
  }

  onGatoChange(event: any) {
    const gatoid = event.target.value;
    if(gatoid=='all'){
      this.cuotasFiltradas=this.cuotas;
    }else{
      this.cuotasFiltradas=this.cuotas.filter(cuota=>cuota.gato && cuota.gato.id==gatoid);
    }
    this.obtenerOptionsEstadoPago();
    this.obtenerOptionsPadrino();
  }

/*   onEstadoChange(event: any) {
    const estadoSeleccionado = event.target.value;
    if(estadoSeleccionado=='Todas'){
      this.getCuotas();
    }else{
      this.service.getByEstado(estadoSeleccionado).subscribe(
        (data) => {
          if(data.length>0){
            this.cuotas=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
          }else{
            Swal.fire("No existen cuotas en el estado "+estadoSeleccionado);
          }
        }
      );
    }
  } */

}
