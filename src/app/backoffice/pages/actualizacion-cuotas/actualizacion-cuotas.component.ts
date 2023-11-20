import { Component } from '@angular/core';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-actualizacion-cuotas',
  templateUrl: './actualizacion-cuotas.component.html',
  styleUrls: ['./actualizacion-cuotas.component.css']
})
export class ActualizacionCuotasComponent {
  
  constructor(private service:CuotasService){}

  actualizarTodas(){
    this.service.actualizarCuotas().subscribe(
      (data)=>{
        //console.log(data);
      }
    )
  }

}
