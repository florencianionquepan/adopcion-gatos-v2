import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichaVeterinaria } from 'src/app/models/FichaVeterinaria';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-ficha-page',
  templateUrl: './ficha-page.component.html',
  styleUrls: ['./ficha-page.component.css']
})
export class FichaPageComponent {
  ficha:FichaVeterinaria=new FichaVeterinaria();
  nombreGatito:string='';

  constructor(private service:GatosService, 
    private ruta: ActivatedRoute){
  }

  ngOnInit():void{
    const state = history.state;
    if (state && state.nombre) {
      this.nombreGatito = state.nombre;
    }
    this.getFicha();
  }

  getFicha():void{
    const id= this.ruta.snapshot.params['id'];
    this.service.getFicha(id).subscribe(resp=>{
      //console.log(resp);
      //si no existe la ficha data=null
      this.ficha=resp.data;
    })
  }

}
