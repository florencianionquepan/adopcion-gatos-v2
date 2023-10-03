import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Notificacion } from 'src/app/models/Notificacion';
import { User } from 'src/app/models/user';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  user=new User();
  public list: any[]=[];
  notificaciones: Notificacion[]=[];
  notificacionesNoLeidas:Notificacion[]=[];

  constructor(private router : Router,
     private service:NotificacionService,
     private crd:ChangeDetectorRef) { 
      if(sessionStorage.getItem('userdetails')){
        this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
        let email=this.user.email;
        this.service.actualizarNotificaciones(email).subscribe((notificaciones) => {
          this.notificaciones = notificaciones;
          this.filtrarNoLeidas();
          this.crd.detectChanges();
        });
      }
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      this.crearLinks();
    }
  }

  filtrarNoLeidas():void{
    this.notificacionesNoLeidas = this.notificaciones.filter(
      (notificacion) => !notificacion.leida
    );
  }

  logout():void{
    sessionStorage.clear();
    window.location.reload();
  }

  crearLinks():void{
    const roleToLinks:any = {
      'ROLE_USER': [
      {
        text:'Mi perfil',
        link:'backoffice/perfil',
        render:true
      },
      {
        text: 'Mis solicitudes',
        link: 'backoffice/missolicitudes',
        render: true
      }],
      'ROLE_VOLUNTARIO': [{
        text: 'Mis gatos',
        link: 'backoffice/misgatos',
        render: true
      }],
      'ROLE_SOCIO': [
        {
          text: 'Solicitudes',
          link: 'backoffice/solicitudes',
          render: true
        },
        {
          text: 'Usuarios',
          link: 'backoffice/usuarios',
          render: true
        }
      ]
    };
  
    const userRoles = this.user.roles.map(rol => rol.nombre);
  
    userRoles.forEach(role => {
      if (roleToLinks[role]) {
        this.list.push(...roleToLinks[role]);
      }
    });
    //console.log(this.list);
  }

}
