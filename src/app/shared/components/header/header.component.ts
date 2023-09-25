import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  user=new User();
  public list: any[]=[]

  constructor(private router : Router) { 

  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      this.crearLinks();
    }
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
