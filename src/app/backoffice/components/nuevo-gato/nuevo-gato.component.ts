import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-nuevo-gato',
  templateUrl: './nuevo-gato.component.html',
  styleUrls: ['./nuevo-gato.component.css']
})
export class NuevoGatoComponent {
  public fotos:File[]=[];
  //@ViewChild('fotosInputFiles',{static:false}) urls!: ElementRef;
  public urls:string[]=[];
  public fotoMin:File | undefined;

  constructor(private fb:FormBuilder, 
    private service:GatosService, 
    private router: Router) {
  }

  public gatoForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    edad:['',[Validators.required]],
    sexo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    color:['',[Validators.required]],
    tipoPelo:['',[Validators.required]]
  });

  onFileChange(event:any):void{
    this.fotos=event.target.files;
    console.log(this.fotos);
    /*     
    Array.from(selectedFotos).forEach((file:File)=>{
      const fr= new FileReader();
      fr.onload=(evento:any)=>{
        const dataUrl=evento.target.result;
        this.urls.push(dataUrl);
      };
      fr.readAsDataURL(file);
    }) */
  }

  nuevoGato():void{
    const gato:GatoDetalle=this.gatoForm.value;
    console.log(this.fotos);
    this.service.nuevoGato(gato,this.fotos)
    .subscribe({
      next:(response)=>{
        console.log(response.data);
      },
      error:(e)=>{
        console.error("Error al cargar el gatito", e);
      }
    })
  }

}
