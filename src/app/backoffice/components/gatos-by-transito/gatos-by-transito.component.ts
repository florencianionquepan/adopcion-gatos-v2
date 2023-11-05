import { Component } from '@angular/core';
import { AsignGato } from 'src/app/models/AsignGatos';
import { FichaVeterinaria } from 'src/app/models/FichaVeterinaria';
import { User } from 'src/app/models/user';
import { TransitoService } from 'src/app/services/transito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gatos-by-transito',
  templateUrl: './gatos-by-transito.component.html',
  styleUrls: ['./gatos-by-transito.component.css']
})
export class GatosByTransitoComponent {
  asignaciones:AsignGato[]=[];
  user:User=new User();

  constructor(private service:TransitoService){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    this.getGatos();
  }

  getGatos():void{
    this.service.gatosByTransito(this.user.email).subscribe(
      data=>{
        console.log(data);
        this.asignaciones=data;
      }
    )
  }

  verFicha(ficha:FichaVeterinaria):void{
    let apiStorage=`${environment.url}/ficha`;
    window.open(`${apiStorage}/file/${ficha.pdf}`,'_blank');
  }

}
