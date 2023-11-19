import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent {
  usuarios:Usuario[]=[];

  constructor(private service:UsuariosService){

  }

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.service.getUsuarios().subscribe(
      (data)=>{
        console.log(data);
        this.usuarios=data;
      }
    )
  }
}
