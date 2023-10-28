import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/Solicitud';
import { User } from 'src/app/models/user';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrls: ['./missolicitudes.component.css']
})
export class MissolicitudesComponent {
  solicitudes:Solicitud[]=[];
  user:User=new User();

  constructor(private service:AdopcionService){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

  ngOnInit(){
    this.service.listarSoliBySolicitante(this.user.email).subscribe(
      (data)=>{
        //console.log(data);
        this.solicitudes=data;
      }
    )
  }
}
