import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Notificacion } from 'src/app/models/Notificacion';
import { NotificacionService } from 'src/app/services/notificacion.service';
declare var bootstrap: any; 

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @ViewChild('toastTrigger') toastTrigger!: ElementRef;
  @ViewChild('toastLiveExample') toastLiveExample!: ElementRef;
  notificaciones:Notificacion[]=[];

  showToast() {
    const toast = new bootstrap.Toast(this.toastLiveExample.nativeElement);
    toast.show();
  }

  constructor(private router:Router, private service:NotificacionService){
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      take(1) // Toma solo el primer evento NavigationEnd
    ).subscribe(e=>{
    if(e instanceof NavigationEnd){
      this.service.listarTodas().subscribe({
        next:(response)=>{
          this.notificaciones=response.data;
          //console.log(this.notificaciones);
        }
        ,error:(e)=>{
          console.log(e);
        }
      })
    }
   }) 
  }

}
