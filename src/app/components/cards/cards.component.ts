import { Component, Input } from '@angular/core';
import { Cat } from 'src/app/models/cat';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() cat:Cat

  constructor(){
    this.cat={id:1,nombre:"","srcFoto":[],"edad":"","sexo":"","descripcion":"","raza":"",
              "color":"","tipoPelo":"","esterilizacion":false,"desparasitacion":false,"solicitantes":[]}
  }
}
