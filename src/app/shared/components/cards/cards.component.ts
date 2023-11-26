import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Gato } from 'src/app/models/gato';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  @Input() cats:Gato[]=[];

  constructor(private router:Router){

  }

  public verGato(cat: Gato){
    this.router.navigate([`/gatos/${cat.id}`]);
  }

  /* 
  public edit(cat: Gato){
    this.ruta.navigate([`/edit/${cat.id}`]);
  } */


}
