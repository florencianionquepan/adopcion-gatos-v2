import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from 'src/app/models/cat';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent{
  @Input() cat:Cat

  constructor(private ruta: Router){
    this.cat={id:0,nombre:"","srcFoto":[],"edad":"","sexo":"","descripcion":"","raza":"",
              "color":"","tipoPelo":"","esterilizacion":false,"desparasitacion":false,"solicitantes":[]}
  }

  public detail(cat: Cat){
    this.ruta.navigate([`/detail/${cat.id}`]);
  }

  public edit(cat: Cat){
    this.ruta.navigate([`/edit/${cat.id}`]);
  }


}
