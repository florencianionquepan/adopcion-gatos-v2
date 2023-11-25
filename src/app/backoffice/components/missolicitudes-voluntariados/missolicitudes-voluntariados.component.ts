import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SolicitudVoluntariado } from 'src/app/models/SolicitudVoluntariado';
import { User } from 'src/app/models/user';
import { VoluntariadoService } from 'src/app/services/voluntariado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missolicitudes-voluntariados',
  templateUrl: './missolicitudes-voluntariados.component.html',
  styleUrls: ['./missolicitudes-voluntariados.component.css']
})
export class MissolicitudesVoluntariadosComponent {
  solicitudes:SolicitudVoluntariado[]=[];
  user:User=new User();
  currentPage = 1;
  itemsPerPage = 2; // o el número que prefieras
  totalPages = 1;

  constructor(private authService:AuthService,
              private service:VoluntariadoService){
  this.user=this.authService.getUser();
  }

  ngOnInit(){
    this.getSolicitudes();
  }


  getSolicitudes() {
    this.service.listarByAspirante(this.user.email).subscribe(
      (data)=>{
        //console.log(data);
        this.solicitudes = data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.solicitudes.forEach(solicitud => {
          solicitud.estados = solicitud.estados.sort((a, b) => b.id! - a.id!);
        });
        this.calculatePages();
      }
    )
  }

  //logica de paginado que debe ir en padre
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

  getDisplayedSoli(): SolicitudVoluntariado[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.solicitudes.slice(startIndex, endIndex);
  }
}
