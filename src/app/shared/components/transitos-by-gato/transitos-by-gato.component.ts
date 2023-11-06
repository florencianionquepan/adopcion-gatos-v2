import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-transitos-by-gato',
  templateUrl: './transitos-by-gato.component.html',
  styleUrls: ['./transitos-by-gato.component.css']
})
export class TransitosByGatoComponent {
  @Input() id:number=0;
  transitos:any[]=[];

  constructor(private service:GatosService){

  }

  ngOnChanges(changes:SimpleChanges):void{
    if(changes['id'] && !changes['id'].firstChange){
      this.service.listarTransitos(this.id).subscribe(
        (data)=>{
          console.log(data);
          this.transitos=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        }
      )
    }
  }
}
