import { Component, Input, SimpleChanges } from '@angular/core';
import { GatoDetalle } from 'src/app/models/GatoDetalle';

@Component({
  selector: 'app-tabla-gatos',
  templateUrl: './tabla-gatos.component.html',
  styleUrls: ['./tabla-gatos.component.css']
})
export class TablaGatosComponent {
  @Input() gatos:GatoDetalle[]=[];
  currentPage = 1;
  itemsPerPage = 5; // o el número que prefieras
  totalPages = 1;


  ngOnChanges(changes:SimpleChanges){
    if(changes['gatos']){
      this.calculatePages();
    }
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.gatos.length / this.itemsPerPage);
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
    return this.gatos.slice(startIndex, endIndex);
  }
}
