import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Solicitud } from 'src/app/models/Solicitud';
import { User } from 'src/app/models/user';
import { AdopcionService } from 'src/app/services/adopcion.service';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrls: ['./missolicitudes.component.css']
})
export class MissolicitudesComponent {
  solicitudes:Solicitud[]=[];
  user:User=new User();
  currentPage = 1;
  itemsPerPage = 2; // o el número que prefieras
  totalPages = 1;

  constructor(private service:AdopcionService, 
    private authService:AuthService){
    this.user=this.authService.getUser();
  }

  ngOnInit(){
    this.getSolicitudes();
  }

  getSolicitudes(){
    this.service.listarSoliBySolicitante(this.user.email).subscribe(
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

  getDisplayedSoli(): Solicitud[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.solicitudes.slice(startIndex, endIndex);
  }

}
