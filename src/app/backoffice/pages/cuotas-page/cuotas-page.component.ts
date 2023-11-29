import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cuota } from 'src/app/models/Cuota';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { User } from 'src/app/models/user';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-cuotas-page',
  templateUrl: './cuotas-page.component.html',
  styleUrls: ['./cuotas-page.component.css']
})
export class CuotasPageComponent {
  cuotas:Cuota[]=[];
  user:User=new User();
  cuotasFiltradas:Cuota[]=[];
  gatos:GatoDetalle[]=[];

  constructor(private service:CuotasService,
    private authService:AuthService){

  }

  ngOnInit(){
    this.user=this.authService.getUser();
    this.getCuotas(this.user.email);
  }

  getCuotas(email:string){
    this.service.getCuotasByEmail(email).subscribe((data)=>{
      this.cuotas=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      //console.log(this.cuotas);
      this.cuotasFiltradas=this.cuotas;
      this.obtenerOptionsGatos();
    })
  }

  obtenerOptionsGatos(){
    this.gatos=[];
    this.cuotasFiltradas.forEach((cuota:any)=>{
      if (cuota.gato && !this.gatos.some((g: GatoDetalle) => g.id === cuota.gato.id)) {
        this.gatos.push(cuota.gato);
      }
    })
  }

  onGatoChange(event: any) {
    const gatoid = event.target.value;
    if(gatoid=='all'){
      this.cuotasFiltradas=this.cuotas;
    }else{
      this.cuotasFiltradas=this.cuotas.filter(cuota=>cuota.gato && cuota.gato.id==gatoid);
    }
  }

}
