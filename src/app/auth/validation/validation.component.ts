import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  public id:number;
  public token:string;

  constructor(private router:ActivatedRoute,private service: RegisterService){
    this.id=this.router.snapshot.params['id'];
    this.token=this.router.snapshot.params['token'];
  }

  ngOnInit():void{
    this.service.validate(this.id,this.token)
    .subscribe({
      next:(response)=>{
        console.log(response);
        if(response.success){
          Swal.fire({
            title:"OK",
            text:response.data,
            icon:'success'
          });
          }
        }
        ,error:(e)=>{
          Swal.fire({'title':e.estado,
          'text':e.mensaje,
          icon:'error'});
        }
      })
      
    }

}
