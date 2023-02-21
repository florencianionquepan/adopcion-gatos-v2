import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat } from 'src/app/models/cat';
import { CatServiceService } from 'src/app/services/cat-service.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent {
  public cat:Cat;

  constructor(private ruta: ActivatedRoute, private catSvc: CatServiceService){
    this.cat={id:0,nombre:"","srcFoto":[],"edad":"","sexo":"","descripcion":"","raza":"",
    "color":"","tipoPelo":"","esterilizacion":false,"desparasitacion":false,"solicitantes":[]}
    this.getCat();
  }

  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.catSvc.getCat(id).subscribe(kitty=>{
      this.cat=kitty;
    })
  }
  
}
