import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { VoluntariadoService } from 'src/app/services/voluntariado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-be-part-of',
  templateUrl: './be-part-of.component.html',
  styleUrls: ['./be-part-of.component.css']
})
export class BePartOfComponent {
  user:User=new User();

  constructor(private service:VoluntariadoService,
    private authService:AuthService){

  }

  ngOnInit(){
    this.user=this.authService.getUser();
  }

  solicitarVoluntariado(tipo:string):void{
    if(!this.user.authStatus){
      this.authService.alertLogin();
    }
    this.service.enviarSolicitud(this.user.email,tipo).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

}
