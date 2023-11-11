import { Component, Input } from '@angular/core';
import { Observable, Subject, catchError, from, map, of, switchMap, takeUntil } from 'rxjs';
import { Solicitud } from 'src/app/models/Solicitud';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { PersonaService } from 'src/app/services/persona.service';
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
  @Input() idGato:number=0;
  datosCargados:boolean=false;
  
  constructor(private service:AdopcionService, 
    private persoService:PersonaService){
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
            this.actualizarTabla(); 
          }
        )
      }
    })
  }

  actualizarTabla() {
    // Se vuelve a llamar al back para actualizar datos de tabla
    this.service.listarByGato(this.idGato).subscribe(
      (response)=>{
        this.solicitudes=response;
      }
    );
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

  adoptoAntes(dni: string) {
    this.service.listarSoliAceptadas(dni).subscribe(
      data=>{
        this.mensajeData(data);
      }
    )
  }

  mensajeData(lista:Solicitud[]):void{
    const nombresGatos:string[]=[];
    if(lista.length==0){
      Swal.fire("El usuario no adoptó nunca");
    }else{
      lista.forEach((sol)=>{
        nombresGatos.push(sol.gato.nombre);
      })
      const nombresGatosH = nombresGatos.map(nombre => `&#x2764; ${nombre}`).join('<br>');
      Swal.fire({
        title:'Algunos gatitos...',
        html:nombresGatosH
      })
    }
  }
  
  esVoluntario(dni:string){
    this.persoService.listaVoluntariados(dni).subscribe(
      data=>{
        this.verVoluntariados(data);
      }
    )
  }

  verVoluntariados(lista:string[]){
    if(lista.length==0){
      Swal.fire("No es parte de Rescats");
    }else{
      const texto=lista.map(nombre => `&#x2764; ${nombre}`).join('<br>');
      Swal.fire({
        title:'Voluntariados que realiza...',
        html:texto
      })
    }
  }

  verMotivo(motivo:string){
    Swal.fire({text:motivo});
  }
}
