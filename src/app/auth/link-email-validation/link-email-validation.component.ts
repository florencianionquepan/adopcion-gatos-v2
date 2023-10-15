import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-link-email-validation',
  templateUrl: './link-email-validation.component.html',
  styleUrls: ['./link-email-validation.component.css']
})
export class LinkEmailValidationComponent {

  constructor(private service:RegisterService,){

  }


  modalLink():void{
    Swal.fire({
      title: 'Ingresa el email a validar',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.service.sendValidation(email)
        .subscribe({
          next:(response)=>{
            if(response.success){
              Swal.fire({
                title:"Link enviado correctamente!",
                text:response.data,
                icon:'success'
              });
            }
          }
          ,error:(e)=>{
            Swal.fire({'title':e.mensaje,
            'icon':'error'});
          }
        })
      },
    })
  }

}
