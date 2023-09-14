import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent {
  gato=new GatoDetalle();

  constructor(private ruta: ActivatedRoute, private catSvc: GatosService){
    this.getCat();
  }

  //agregar manejo errores
  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.catSvc.getGatoById(id).subscribe(resp=>{
      //console.log(resp);
      this.gato=resp.data;
    })
  }
  
}
