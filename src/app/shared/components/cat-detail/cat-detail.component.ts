import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent {
  gato=new GatoDetalle();
  user=new User();

  constructor(private ruta: ActivatedRoute,
            private catSvc: GatosService,
            private authSvc:AuthService){
    this.getCat();
  }

  ngOnInit(){
    this.user=this.authSvc.user;
  }

  //agregar manejo errores
  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.catSvc.getGatoById(id).subscribe(resp=>{
      //console.log(resp);
      this.gato=resp.data;
    })
  }

  adoptar(gato:GatoDetalle):void{
    if(this.user.authStatus){
      this.alertAdopcion();
    }else{
      this.alertLogin();
    }
  }

  alertAdopcion():void{
    Swal.fire({
      title: 'Estas seguro de enviar tu solicitud de adopcion?',
      icon: 'info',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar Solicitud'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enviarSolicitud(this.gato,this.user);
      }
    })
  }

  enviarSolicitud(gato:GatoDetalle, user:User):void{

  }

  apadrinar(gato:GatoDetalle):void{

  }

  alertLogin():void{
    this.authSvc.alertLogin();
  }
  
}
