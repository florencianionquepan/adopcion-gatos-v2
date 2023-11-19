import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


const estados={
  'bloquear':'bloqueado',
  'desbloquear':'desbloqueado'
};

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})

export class TablaUsuariosComponent {
  usuarios:Usuario[]=[];

  constructor(private service:UsuariosService,
    private persoService:PersonaService){

  }

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.service.getUsuarios().subscribe(
      (data)=>{
        //console.log(data);
        this.usuarios=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    )
  }

  esVoluntario(dni:string){
    this.persoService.listaVoluntariados(dni).subscribe(
      data=>{
        this.verVoluntariados(data);
      }
    )
  }

  verVoluntariados(lista:string[]){
    if(lista.length==0){
      Swal.fire("No es parte de Rescats");
    }else{
      const texto=lista.map(nombre => `&#x2764; ${nombre}`).join('<br>');
      Swal.fire({
        title:'Voluntariados que realiza...',
        html:texto
      })
    }
  }

  verMotivo(motivo:string){
    Swal.fire({text:motivo});
  }

  bloquear(id:number){
    this.actualizacionHabilitado(id,"bloquear");
  }

  desbloquear(id:number){
    this.actualizacionHabilitado(id,"desbloquear");
  }

  //estados son bloqueado o desbloqueado
  actualizacionHabilitado(id:number, accion:keyof typeof estados){
    const estado:string=estados[accion];
    Swal.fire({
      title:`¿Esta seguro de ${accion} al usuario? 
      A continuación, debe ingresar el motivo!`,
      input: 'textarea',
      inputPlaceholder: 'Describa el motivo...',
      inputAttributes:{
        autocapitalize:'off',
        maxlength:'200',
        autocorrect:'off',
      },
      showCancelButton: true,
      confirmButtonText: `${accion}`.charAt(0).toUpperCase()+`${accion}`.slice(1),
      confirmButtonColor:'#F27474',
      cancelButtonText: 'Cancelar',
      icon:'warning',
      preConfirm: (motivo) => {
        if (motivo.length < 20) {
          Swal.showValidationMessage('El motivo debe tener al menos 20 caracteres');
        }
      },
    }).then((motivo)=>{
      if(motivo.value){
        const valor=motivo.value;
        this.service.habilitadoUsuario(id,valor,estado).subscribe(
          (data)=>{
            console.log(data);
            this.success(data.email, estado);
            this.getUsuarios();
          }
        )
      }
    })
  }

  success(email:string, estado:string):void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `El usuario con email ${email} ha sido ${estado} con exito!`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  darRolAdmin(id:number){
    Swal.fire({
      title:`¿Esta seguro de darle permisos de administrador al usuario?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon:'warning',
    }).then((result)=>{
      if(result.isConfirmed){
        this.service.crearAdmin(id).subscribe(
          (data)=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `El usuario con email ${data.email} ahora tiene permisos de administrador`,
              showConfirmButton: false,
              timer: 1500
            })
          }
        )
      }
    })
  }
}
