import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { Solicitud } from 'src/app/models/Solicitud';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { AdopcionService } from 'src/app/services/adopcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-solicitudes-adopcion',
  templateUrl: './tabla-solicitudes-adopcion.component.html',
  styleUrls: ['./tabla-solicitudes-adopcion.component.css'],
  providers: [AgePipe]
})
export class TablaSolicitudesAdopcionComponent {
  idGato:number;
  solicitudes:Solicitud[]=[];
  

  constructor(private service:AdopcionService,
            private actiRoute:ActivatedRoute,
            private agePipe:AgePipe){
    this.idGato=this.actiRoute.snapshot.params['id'];
    this.service.listarByGato(this.idGato).subscribe(
      (response)=>{
        this.solicitudes=response;
      }
    )

  }

  verDetalles(persona:Persona):void{
    const edad = this.agePipe.transform(persona.fechaNac);
    const detallesHTML = `
      <div>
        <p><strong>Nombre:</strong> ${persona.nombre}</p>
        <p><strong>Apellido:</strong> ${persona.apellido}</p>
        <p><strong>Direccion:</strong> ${persona.dire}</p>
        <p><strong>Localidad:</strong> ${persona.localidad}</p>
        <p><strong>Email:</strong> ${persona.email}</p>
        <p><strong>Teléfono:</strong> ${persona.tel}</p>
        <p><strong>Edad:</strong> ${edad}</p>
      </div>
    `;
    Swal.fire({
      title: 'Detalles del Solicitante',
      html: detallesHTML,
      confirmButtonText: 'Cerrar'
    })
  }

  aceptar(){

  }

  rechazar(){

  }
}
