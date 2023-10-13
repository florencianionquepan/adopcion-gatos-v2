import { Component, Input } from '@angular/core';
import { Solicitud } from 'src/app/models/Solicitud';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { AdopcionService } from 'src/app/services/adopcion.service';
import Swal from 'sweetalert2';

const estados={
  'aceptar':'aceptada',
  'rechazar':'rechazada'
};

@Component({
  selector: 'app-tabla-solicitudes-adopcion',
  templateUrl: './tabla-solicitudes-adopcion.component.html',
  styleUrls: ['./tabla-solicitudes-adopcion.component.css'],
  providers: [AgePipe]
})

export class TablaSolicitudesAdopcionComponent {
  @Input() solicitudes: Solicitud[] = [];
  
  constructor(private service:AdopcionService){
  }

  aceptar(id:number){
    this.actualizacionSolicitud(id,"aceptar");
  }

  rechazar(id:number){
    this.actualizacionSolicitud(id,"rechazar");
  }

  //estados son aceptar o rechazar
  actualizacionSolicitud(id:number, accion:keyof typeof estados){
    const estado:string=estados[accion];
    Swal.fire({
      title:`¿Esta seguro de ${accion} al solicitante? A continuación, debe ingresar el motivo!`,
      input: 'textarea',
      inputPlaceholder: 'Describa el motivo...',
      inputAttributes:{
        autocapitalize:'off',
        maxlength:'200',
        autocorrect:'off',
      },
      showCancelButton: true,
      confirmButtonText: `${accion}`.charAt(0).toUpperCase()+`${accion}`.slice(1),
      confirmButtonColor:'#F27474',
      cancelButtonText: 'Cancelar',
      icon:'warning',
      preConfirm: (motivo) => {
        if (motivo.length < 20) {
          Swal.showValidationMessage('El motivo debe tener al menos 20 caracteres');
        }
      },
    }).then((motivo)=>{
      if(motivo.value){
        const valor=motivo.value;
        this.service.actualizarSolicitud(id, estado, valor).subscribe(
          response=>{
            //console.log(response);
            const solicitud=response;
            this.success(solicitud.solicitante.nombre);
            this.actualizarTabla(solicitud); 
          }
        )
      }
    })
  }

  actualizarTabla(solicitudActualizada: Solicitud) {
    // Buscar y reemplazar la solicitud actualizada en la lista
    const index = this.solicitudes.findIndex((s) => s.id === solicitudActualizada.id);
    if (index !== -1) {
      this.solicitudes[index] = solicitudActualizada;
    }
  }

  success(nombre:string):void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `La solicitud de ${nombre} fue actualizada!`,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
