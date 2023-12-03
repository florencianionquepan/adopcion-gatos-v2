import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AsignGato } from 'src/app/models/AsignGatos';
import { FichaVeterinaria } from 'src/app/models/FichaVeterinaria';
import { User } from 'src/app/models/user';
import { TransitoService } from 'src/app/services/transito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gatos-by-transito',
  templateUrl: './gatos-by-transito.component.html',
  styleUrls: ['./gatos-by-transito.component.css']
})
export class GatosByTransitoComponent {
  asignaciones:AsignGato[]=[];
  gatosFiltrados:AsignGato[]=[];
  user:User=new User();
  currentPage = 1;
  itemsPerPage = 5; // o el número que prefieras
  totalPages = 1;

  constructor(private service:TransitoService, private authService:AuthService){
    this.user=this.authService.getUser();
    this.getGatos();
  }

  getGatos():void{
    this.service.gatosByTransito(this.user.email).subscribe(
      data=>{
        //console.log(data);
        this.asignaciones=data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
        this.gatosFiltrados=this.asignaciones;
        this.calculatePages();
      }
    )
  }

  verFicha(ficha:FichaVeterinaria):void{
    let apiStorage=`${environment.url}/ficha`;
    window.open(`${apiStorage}/file/${ficha.pdf}`,'_blank');
  }

  //logica de paginacion qe debe ir en padre

  ngOnChanges(changes:SimpleChanges){
    if(changes['asignaciones']){
      this.calculatePages();
    }
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.gatosFiltrados.length / this.itemsPerPage);
    //console.log(this.totalPages);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
  }

  getDisplayedasignaciones(): AsignGato[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.gatosFiltrados.slice(startIndex, endIndex);
  }

  //filtrado
  onAsignChange(event: any) {
    const gatosmios=event.target.value;
    if(gatosmios=='all'){
      this.gatosFiltrados=this.asignaciones;
      this.calculatePages();
    }else if(gatosmios=='false'){
      this.gatosFiltrados=this.asignaciones.filter(asign=>asign.fechaFin!=null);
      this.calculatePages();
    }else if(gatosmios=='true'){
      this.gatosFiltrados=this.asignaciones.filter(asign=>asign.fechaFin==null);
      this.calculatePages();
    }
  }

}
