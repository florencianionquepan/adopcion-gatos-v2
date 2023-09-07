import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gato } from 'src/app/models/gato';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  public cats:Gato[]=[];

  constructor(private gatoSvc:CatServiceService, private router:Router){

  }

  ngOnInit(): void {
    // Hacer la solicitud y suscribirse al observable
    this.gatoSvc.verGatos().subscribe(response => {
      if (response.success) {
        this.cats = response.data.reverse(); // Asignamos los datos al arreglo de gatos
      }
    });
  }

  public verGato(cat: Gato){
    this.router.navigate([`/gatos/${cat.id}`]);
  }

  /* 
  public edit(cat: Gato){
    this.ruta.navigate([`/edit/${cat.id}`]);
  } */


}
