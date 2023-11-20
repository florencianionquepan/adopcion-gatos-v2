import { Component } from '@angular/core';
import { Cuota } from 'src/app/models/Cuota';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-actualizacion-cuotas',
  templateUrl: './actualizacion-cuotas.component.html',
  styleUrls: ['./actualizacion-cuotas.component.css']
})
export class ActualizacionCuotasComponent {
  cuotas:Cuota[]=[]
  
  constructor(private service:CuotasService){}

  ngOnInit(){
    this.getCuotas();
  }

  actualizarTodas(){
    this.service.actualizarCuotas().subscribe(
      (data)=>{
        //console.log(data);
      }
    )
  }

  getCuotas(){
    this.service.getAll().subscribe(
      (data)=>{
        //console.log(data);
        this.cuotas=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    )
  }

}
