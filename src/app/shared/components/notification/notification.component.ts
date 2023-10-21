import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Notificacion } from 'src/app/models/Notificacion';
import { User } from 'src/app/models/user';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  user=new User();
  @Input() notificaciones: Notificacion[]=[];
  @Input() notificacionesNoLeidas:Notificacion[]=[];
  @Input() contadorNoLeidas!:number;
  @ViewChild('botonNoti') botonNoti!: ElementRef;

  constructor(private router:Router, 
    private service:NotificacionService, 
    private crd:ChangeDetectorRef,
    private renderer:Renderer2){
  }

}
