import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { Gato } from 'src/app/models/gato';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() cats:GatoDetalle[]=[];

  constructor(private router:Router){

  }

  public verGato(id:number){
    this.router.navigate([`/gatos/${id}`]);
  }

  /* 
  public edit(cat: Gato){
    this.ruta.navigate([`/edit/${cat.id}`]);
  } */


}
