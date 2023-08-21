import { Component, Input, OnInit } from '@angular/core';
import { Gato } from 'src/app/models/gato';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  public cats:Gato[]=[];

  constructor(private gatoSvc:CatServiceService){
/*     this.cat={id:0,nombre:"","fotos":[],"edad":"","sexo":"","descripcion":"",
              "color":"","tipoPelo":"","adoptado":false,"solicitudes":[]} */
  }

  ngOnInit(): void {
    // Hacer la solicitud y suscribirse al observable
    this.gatoSvc.verGatos().subscribe(response => {
      if (response.Success) {
        this.cats = response.data.reverse(); // Asignamos los datos al arreglo de gatos
      }
    });
  }
/* 
  public detail(cat: Gato){
    this.ruta.navigate([`/detail/${cat.id}`]);
  }

  public edit(cat: Gato){
    this.ruta.navigate([`/edit/${cat.id}`]);
  } */


}
