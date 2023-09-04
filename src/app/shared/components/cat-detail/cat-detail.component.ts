import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gato } from 'src/app/models/gato';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent {
  public cat:Gato;

  constructor(private ruta: ActivatedRoute, private catSvc: CatServiceService){
    this.cat={id:0,nombre:"","fotos":[],"edad":"","sexo":"","descripcion":"",
    "color":"","tipoPelo":"","adoptado":false,"solicitudes":[]}
    this.getCat();
  }

  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.catSvc.getCat(id).subscribe(kitty=>{
      this.cat=kitty;
    })
  }
  
}
