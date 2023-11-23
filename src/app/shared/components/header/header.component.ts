import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Notificacion } from 'src/app/models/Notificacion';
import { User } from 'src/app/models/user';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { NotificationComponent } from '../notification/notification.component';

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
  contadorNoLeidas!:number;
  @ViewChild('childRef', { static: false }) notiComp!: NotificationComponent;

  constructor(private service:NotificacionService,
     private crd:ChangeDetectorRef,
     private renderer:Renderer2) { 
       if(localStorage.getItem('userdetails')){
        this.user = JSON.parse(localStorage.getItem('userdetails')!);
        let email=this.user.email;
        this.service.actualizarNotificaciones(email).subscribe((notificaciones) => {
          this.notificaciones = notificaciones;
          this.filtrarNoLeidas();
          this.contadorNoLeidas=this.notificacionesNoLeidas.length;
          this.crd.detectChanges();
        });
      } 
  }

  ngOnInit() {
    if(localStorage.getItem('userdetails')){
      this.user = JSON.parse(localStorage.getItem('userdetails')!);
      this.crearLinks();
    }
  }

  //esto debe ir en componente notificaciones
  ngAfterViewInit():void{
    if(localStorage.getItem('userdetails')){
    //esto te dara undefined pq hasta que recibe la rta es undefined!!console.log(this.contadorNoLeidas);
    if(this.contadorNoLeidas!=0){
      this.renderer.listen(this.notiComp.botonNoti.nativeElement,'click',()=>{
        this.service.setearNotiLeidas(this.notificacionesNoLeidas).subscribe({
          next:(noti)=>{
            //console.log(noti);
          }
        }
        )
        setTimeout(() => {
          this.marcarComoLeidas();
        }, 1000);
      })
    }
    }
  }

  marcarComoLeidas():void{
    this.notificacionesNoLeidas.forEach((notificacion) => {
      notificacion.leida = true;
    });
    this.contadorNoLeidas=0;
    this.crd.detectChanges();
  }

  filtrarNoLeidas():void{
    this.notificacionesNoLeidas = this.notificaciones.filter(
      (notificacion) => !notificacion.leida
    );
  }

  logout():void{
    localStorage.clear();
    window.location.reload();
  }

  crearLinks():void{
    const roleToLinks:any = {
      'ROLE_USER': [
      {
        parent:'Cuenta',
        text:'Mi perfil',
        link:'backoffice/perfil',
        render:true
      },
      {
        parent:'Cuenta',
        text: 'Mis solicitudes',
        link: 'backoffice/missolicitudes',
        render: true
      }],
      'ROLE_VOLUNTARIO': [{
        parent:'Voluntariados',
        text: 'Mis gatos',
        link: 'backoffice/misgatos',
        render: true
      }],
      'ROLE_SOCIO': [
        {
          parent:'Admin',
          text: 'Solicitudes voluntariados',
          link: 'backoffice/solicitudes',
          render: true
        },
        {
          parent:'Admin',
          text: 'Usuarios',
          link: 'backoffice/usuarios',
          render: true
        },
        {
          parent:'Admin',
          text: 'Actualizacion de cuotas',
          link: 'backoffice/cuotas/actualizacion',
          render: true
        }
      ]
    };

    if(this.user.esTransito){
      roleToLinks['ROLE_USER'].push({
        parent:'Voluntariados',
        text: 'Gatos en transito',
        link: 'backoffice/gatosentransito',
        render: true,
      })
    }

    if(this.user.esPadrino){
      roleToLinks['ROLE_USER'].push({
        parent:'Voluntariados',
        text: 'Mis Cuotas',
        link: 'backoffice/miscuotas',
        render: true,
      })
    }
  
    const userRoles = this.user.roles.map(rol => rol.nombre);
  
    userRoles.forEach(role => {
      if (roleToLinks[role]) {
        this.list.push(...roleToLinks[role]);
      }
    });
    //console.log(this.list);

    const menuHierarchy: any[] = [];
    userRoles.forEach(role => {
      if (roleToLinks[role]) {
        roleToLinks[role].forEach((link: { parent: any; text: any; link: any; render: any; }) => {
          const existingParent = menuHierarchy.find(item => item.parent === link.parent);
  
          if (existingParent) {
            existingParent.list.push({
              text: link.text,
              link: link.link,
              render: link.render
            });
          } else {
            menuHierarchy.push({
              parent: link.parent,
              list: [{
                text: link.text,
                link: link.link,
                render: link.render
              }]
            });
          }
        });
      }
    });
    this.list = menuHierarchy;
    //console.log(this.list);
  }

}
