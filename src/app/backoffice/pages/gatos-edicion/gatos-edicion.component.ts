import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-gatos-edicion',
  templateUrl: './gatos-edicion.component.html',
  styleUrls: ['./gatos-edicion.component.css']
})
export class GatosEdicionComponent {
  gato:GatoDetalle=new GatoDetalle();

  constructor(private service:GatosService, 
    private ruta: ActivatedRoute){
      this.getCat();
  }

  //agregar manejo errores
  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.service.getGatoById(id).subscribe(resp=>{
      console.log(resp);
      this.gato=resp.data;
    })
  }

}
