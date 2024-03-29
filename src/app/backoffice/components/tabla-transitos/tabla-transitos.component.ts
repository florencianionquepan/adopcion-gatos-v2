import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Transito } from 'src/app/models/Transito';
import { Gato } from 'src/app/models/gato';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-transitos',
  templateUrl: './tabla-transitos.component.html',
  styleUrls: ['./tabla-transitos.component.css']
})
export class TablaTransitosComponent {
@Input() transitos: Transito[]=[];
@Output() asignarTransitoEvent = new EventEmitter<{ id: number, nombre: string }>();
@Input() filterTransitos='';


  verGatos(transito:string,gatos:Gato[]){
    let html='';
    gatos.forEach(gato=>{
      html+=`<a href="/gatos/${gato.id}" class="colorw" target="_blank">
      <i class="bi bi-suit-heart"></i>${gato.nombre}</a><br>`
    })
    Swal.fire({
      title:'Transitos de '+transito,
      html:html
    })
  }

  asignarTransito(id: number, nombre: string) {
    this.asignarTransitoEvent.emit({ id, nombre });
  }
}
