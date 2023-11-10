import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { User } from 'src/app/models/user';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-gatos-by-voluntario',
  templateUrl: './gatos-by-voluntario.component.html',
  styleUrls: ['./gatos-by-voluntario.component.css']
})
export class GatosByVoluntarioComponent {
  user=new User();
  public gatos:GatoDetalle[]=[];
  mostrarForm:boolean=false;

  constructor(private gatoSer:GatosService,
    private authService:AuthService){

  }

  ngOnInit(){
    this.user=this.authService.getUser();
    this.getGatos();
  }

  cargarGato():void{
    this.mostrarForm=true;
  }

  public getGatos():void{
    this.gatoSer.gatosByVoluntario(this.user.email)
    .subscribe({
      next:(response)=>{
        console.log(response.data);
        this.gatos=response.data;
      },
      error:(e)=>{
        console.error("Error al obtener los datos", e);
      }
    })
  }

}
