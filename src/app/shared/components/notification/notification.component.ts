import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any; 

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @ViewChild('toastTrigger') toastTrigger!: ElementRef;
  @ViewChild('toastLiveExample') toastLiveExample!: ElementRef;

  showToast() {
    const toast = new bootstrap.Toast(this.toastLiveExample.nativeElement);
    toast.show();
  }

}
