import { Component } from '@angular/core';
import { Cuota } from 'src/app/models/Cuota';
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

  constructor(private service:CuotasService){

  }

  ngOnInit(){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    this.getCuotas(this.user.email);
  }

  getCuotas(email:string){
    this.service.getCuotasByEmail(email).subscribe((data)=>{
      this.cuotas=data;
      this.cuotas.sort((a, b) => {
        return new Date(b.fechaCreacion!).getTime() - new Date(a.fechaCreacion!).getTime();
    });
    })
  }
}
