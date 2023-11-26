import { Component } from '@angular/core';
import { Gato } from 'src/app/models/gato';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gatos:Gato[]=[];
  currentPage:number = 0;
  totalPages:number=1;

  constructor(private gatoSvc:GatosService){

  }

  ngOnInit(): void {
    this.getGatos();
  }

  getGatos(){
    this.gatoSvc.verPaginados(this.currentPage).subscribe(
      (data)=>{
        console.log(data);
        this.gatos = data.content; 
        this.gatos.forEach(gato=>{
          if(gato.fotos){
            gato.fotos= gato.fotos.map(foto=>{
              return foto.replace('/upload/','/upload/q_auto,f_auto,fl_lossy/');
            }
            )
          }
        })
        this.totalPages=data.totalPages;
      }
    )
  }

  setPage(page: number) {
    this.currentPage = page;
    //console.log(this.currentPage);
    this.getGatos();
  }

  generatePagesArray() {
    if (this.gatos && this.totalPages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    return [];
  }

}
