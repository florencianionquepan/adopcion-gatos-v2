import { Component, OnInit } from '@angular/core';
import { Gato } from 'src/app/models/gato';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  public cats:Gato[]=[];

  constructor(private gatoSvc: CatServiceService){
  }

  ngOnInit(): void {
    // Hacer la solicitud y suscribirse al observable
    this.gatoSvc.verGatos().subscribe(response => {
      if (response.Success) {
        this.cats = response.data.reverse(); // Asignamos los datos al arreglo de gatos
      }
    });
  }
}
