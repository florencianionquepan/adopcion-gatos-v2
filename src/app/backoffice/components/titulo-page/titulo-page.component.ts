import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-page',
  templateUrl: './titulo-page.component.html',
  styleUrls: ['./titulo-page.component.css']
})
export class TituloPageComponent {
  @Input() titulo:string='';
  @Input() link:string='';
  @Input() icono:string='';
}
