import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gato } from 'src/app/models/gato';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() cat:Gato

  constructor(private ruta: Router){
    this.cat={id:0,nombre:"","fotos":[],"edad":"","sexo":"","descripcion":"",
              "color":"","tipoPelo":"","adoptado":false,"solicitudes":[]}
  }

  ngOnInit(){

  }

  public detail(cat: Gato){
    this.ruta.navigate([`/detail/${cat.id}`]);
  }

  public edit(cat: Gato){
    this.ruta.navigate([`/edit/${cat.id}`]);
  }


}
