import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  constructor(private service:AdopcionService, 
    private authService:AuthService){
    this.user=this.authService.getUser();
  }

  ngOnInit(){
    this.getSolicitudes();
  }

  getSolicitudes(){
    this.service.listarSoliBySolicitante(this.user.email).subscribe(
      (data)=>{
        //console.log(data);
        this.solicitudes=data;
      }
    )
  }
}
