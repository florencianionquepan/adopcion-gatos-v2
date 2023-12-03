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
import { CuotasService } from 'src/app/services/cuotas.service';
import { PadrinoService } from 'src/app/services/padrino.service';
import { Persona } from 'src/app/models/Persona';
registerLocaleData(localeEs);

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent {
  gato=new GatoDetalle();
  user=new User();
  esVoluntario=false;
  esPadrino=false;
  adoptante:Persona=new Persona();

  constructor(private ruta: ActivatedRoute,
            private catSvc: GatosService,
            private authSvc:AuthService,
            private adopcionSvc:AdopcionService,
            private cuotaser:CuotasService){
    this.getCat();
  }

  ngOnInit(){
    this.user=this.authSvc.getUser();
    if(this.user.authStatus){
      this.esVoluntario=this.user.roles.some(role=>role.nombre=='ROLE_VOLUNTARIO');
      this.esPadrino=this.user.esPadrino;
    }
  }

  //agregar manejo errores
  getCat():void{
    const id= this.ruta.snapshot.params['id'];
    this.catSvc.getGatoById(id).subscribe(resp=>{
      //console.log(resp);
      this.gato=resp.data;
      if(this.user.authStatus){
        this.esVoluntario=(this.gato.voluntario!.email==this.user.email);
        if(this.gato.padrino){
          this.esPadrino=(this.gato.padrino.email==this.user.email);
        }else{
          this.esPadrino=false;
        }
      }
      this.adoptante=resp.data.adoptante;
      /* if(this.gato.padrino){
        this.padrinosser.renunciaAutomatica(this.gato).subscribe(
          (data)=>{
            //si el gato no existe en el listado de padrinos: this.gato.padrino=null; y actualizar vista
            let existeEsteGato=data.listaGatos.some((gat: { id: any; })=>gat.id==id)
            //console.log(existeEsteGato)
            if(!existeEsteGato){
              this.gato.padrino=null;
            }
          }
        )
      } */
    })
  }

  adoptar():void{
    this.user=this.authSvc.getUser();
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
        //console.log(e);
        Swal.fire({
          title:e.mensaje,
          icon:'error'
        })
      }
    })
  }

  apadrinar():void{
    this.user=this.authSvc.getUser();
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
        this.cuotaser.pagarCuota(this.user.email,this.gato).subscribe(
          data=>{
            //console.log(data);
          }
        )
      }
    })
  }

  alertLogin():void{
    this.authSvc.alertLogin();
  }
  
}
