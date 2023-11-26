import { Component, Input, SimpleChanges } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-tabla-gatos',
  templateUrl: './tabla-gatos.component.html',
  styleUrls: ['./tabla-gatos.component.css']
})
export class TablaGatosComponent {
  @Input() gatos:GatoDetalle[]=[];
  gatosFiltrados:GatoDetalle[]=[];
  currentPage = 1;
  itemsPerPage = 5; // o el número que prefieras
  totalPages = 1;

  ngOnInit(){
    this.gatosFiltrados=this.gatos;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['gatos']){
      this.gatosFiltrados=this.gatos;
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

  getDisplayedgatos(): GatoDetalle[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.gatosFiltrados.slice(startIndex, endIndex);
  }

  //filtrado
  onGatosChange(event: any) {
    const gatosadoptado=event.target.value;
    if(gatosadoptado=='true'){
      this.gatosFiltrados=this.gatos.filter(gato=>gato.adoptado!=null);
      this.calculatePages();
    }else if(gatosadoptado=='false'){
      this.gatosFiltrados=this.gatos.filter(gato=>gato.adoptado==null);
      this.calculatePages();
    }else{
      this.gatosFiltrados=this.gatos;
      this.calculatePages();
    }
  }
}
