import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { PadrinoService } from 'src/app/services/padrino.service';
registerLocaleData(localeEs);

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
            private authSvc:AuthService,
            private adopcionSvc:AdopcionService,
            private padrinoSvc:PadrinoService){
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

  adoptar():void{
    if(sessionStorage.getItem('userdetails')){
      this.user=JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    if(this.user.authStatus){
      this.alertAdopcion();
    }else{
      this.authSvc.setUrlActual();
      this.alertLogin();
    }
  }

  alertAdopcion():void{
    Swal.fire({
      title: 'Estas seguro de enviar tu solicitud de adopcion?',
      icon: 'info',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar Solicitud',
      showCancelButton:true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.enviarSolicitud(this.gato,this.user);
      }
    })
  }

  enviarSolicitud(gato:GatoDetalle, user:User):void{
    this.adopcionSvc.enviarSolicitud(gato.id,this.user.email)
    .subscribe({
      next:(response)=>{
        //console.log(response);
        if(response.status==201){
          Swal.fire({
            title:'Solicitud enviada con exito!',
            icon:'success'
          })
        }
      }
      ,error:(e)=>{
        console.log(e);
        Swal.fire({
          title:e.mensaje,
          icon:'error'
        })
      }
    })
  }

  apadrinar():void{
    if(sessionStorage.getItem('userdetails')){
      this.user=JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    if(this.user.authStatus){
      this.alertApadrinar();
    }else{
      this.authSvc.setUrlActual();
      this.alertLogin();
    }
  }

  alertApadrinar():void{
    Swal.fire({
      title: `Estas seguro de apadrinar a ${this.gato.nombre}?`,
      text:'Seras redirigido a un sitio externo para realizar el pago',
      icon: 'info',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Pagar cuota',
      showCancelButton:true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.padrinoSvc.pagarCuota(this.user.email,this.gato).subscribe(
          data=>{
            console.log(data);
          }
        )
      }
    })
  }

  alertLogin():void{
    this.authSvc.alertLogin();
  }
  
}
