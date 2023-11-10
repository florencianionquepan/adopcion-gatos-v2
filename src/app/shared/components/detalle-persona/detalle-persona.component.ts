import { Component, Input } from '@angular/core';
import { Persona } from 'src/app/models/Persona';
import { AgePipe } from 'src/app/pipes/age.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.component.html',
  styleUrls: ['./detalle-persona.component.css'],
  providers: [AgePipe]
})
export class DetallePersonaComponent {
  @Input() persona:Persona=new Persona();


  constructor(private agePipe:AgePipe){}

  verDetalles(persona:Persona):void{
    const edad = this.agePipe.transform(persona.fechaNac);
    const detallesHTML = `
      <div style="text-align:start;">
        <p><strong>Apellido:</strong> ${persona.apellido}</p>
        <p><strong>DNI:</strong> ${persona.dni}</p>
        <p><strong>Direccion:</strong> ${persona.dire}</p>
        <p><strong>Localidad:</strong> ${persona.localidad}</p>
        <p><strong>Email:</strong> ${persona.email}</p>
        <p><strong>Teléfono:</strong> ${persona.tel}</p>
        <p><strong>Edad:</strong> ${edad}</p>
      </div>
    `;
    Swal.fire({
      title: 'Detalles de '+persona.nombre,
      html: detallesHTML,
      confirmButtonText: 'Cerrar'
    })
  }
}
