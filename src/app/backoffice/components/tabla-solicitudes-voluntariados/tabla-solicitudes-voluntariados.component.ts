import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Solicitud } from 'src/app/models/Solicitud';
import { SolicitudVoluntariado } from 'src/app/models/SolicitudVoluntariado';
import { User } from 'src/app/models/user';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { VoluntariadoService } from 'src/app/services/voluntariado.service';
import Swal from 'sweetalert2';

const estados={
  'aceptar':'aceptada',
  'rechazar':'rechazada'
};

@Component({
  selector: 'app-tabla-solicitudes-voluntariados',
  templateUrl: './tabla-solicitudes-voluntariados.component.html',
  styleUrls: ['./tabla-solicitudes-voluntariados.component.css']
})
export class TablaSolicitudesVoluntariadosComponent {
  solicitudes:SolicitudVoluntariado[]=[];
  user:User=new User();
  currentPage = 1;
  itemsPerPage = 5; // o el número que prefieras
  totalPages = 1;

  constructor(private authService:AuthService,
    private service:VoluntariadoService,
    private adopcionService:AdopcionService,
    private persoService:PersonaService){}

    ngOnInit(){
      this.service.listarTodas().subscribe(
        (data)=>{
          //console.log(data);
          this.solicitudes=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        }
      )
      this.user=this.authService.getUser();
    }

    adoptoAntes(dni:string){
      this.adopcionService.listarSoliAceptadas(dni).subscribe(
        data=>{
          this.mensajeData(data);
        }
      )
    }


  mensajeData(lista:Solicitud[]):void{
    const nombresGatos:string[]=[];
    if(lista.length==0){
      Swal.fire("El usuario no adoptó nunca");
    }else{
      lista.forEach((sol)=>{
        nombresGatos.push(sol.gato.nombre);
      })
      const nombresGatosH = nombresGatos.map(nombre => `&#x2764; ${nombre}`).join('<br>');
      Swal.fire({
        title:'Algunos gatitos...',
        html:nombresGatosH
      })
    }
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

    aceptar(id:number){
      this.actualizacionSolicitud(id,"aceptar");
    }

    rechazar(id:number){
      this.actualizacionSolicitud(id,"rechazar");
    }


  actualizacionSolicitud(id:number, accion:keyof typeof estados){
    const estado:string=estados[accion];
    const email:string=this.user.email;
    Swal.fire({
      title:`¿Esta seguro de ${accion} al aspirante? A continuación, debe ingresar el motivo!`,
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
        this.service.actualizarSolicitud(id, estado, valor, email).subscribe(
          response=>{
            //console.log(response);
            const solicitud=response;
            this.success(solicitud.aspirante.nombre);
            this.actualizarTabla(); 
          }
        )
      }
    })
  }

  success(nombre:string):void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `La solicitud de ${nombre} fue actualizada!`,
      showConfirmButton: false,
      timer: 1500
    })
  }

  actualizarTabla() {
    // Se vuelve a llamar al back para actualizar datos de tabla
    this.service.listarTodas().subscribe(
      (data)=>{
        //console.log(data);
        this.solicitudes=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
      }
    )
  }

  //logica de paginacion

  ngOnChanges(changes:SimpleChanges){
    if(changes['solicitudes']){
      this.calculatePages();
    }
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.solicitudes.length / this.itemsPerPage);
    //console.log(this.totalPages);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
  }

  getDisplayedsolicitudes(): SolicitudVoluntariado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.solicitudes.slice(startIndex, endIndex);
  }


}
