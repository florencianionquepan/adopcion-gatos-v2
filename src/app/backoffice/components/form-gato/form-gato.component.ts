import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { Voluntario } from 'src/app/models/Voluntario';
import { User } from 'src/app/models/user';
import { GatosService } from 'src/app/services/gatos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-gato',
  templateUrl: './form-gato.component.html',
  styleUrls: ['./form-gato.component.css']
})
export class FormGatoComponent {
  @Input() mostrarForm:boolean=false;
  @Output() mostrarFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public fotos:File[]=[];
  @ViewChild('inputFiles', { static: false }) inputFiles!: ElementRef;
  public urls:string[]=[];
  public url:File | undefined;

  user=new User();

  constructor(private fb:FormBuilder, 
    private service:GatosService, 
    private router: Router) {
  }

  ngOnInit(){
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
      }
  }

  public gatoForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    edad:['',[Validators.required,Validators.pattern('^[A-Za-z0-9 ]+$')]],
    sexo:['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
    descripcion:['',[Validators.required]],
    color:['',[Validators.required,Validators.pattern('^[A-Za-z ]+$')]],
    tipoPelo:['',[Validators.required,,Validators.pattern('^[A-Za-z ]+$')]],
    montoMensual:['',[Validators.min(0)]],
    fotos:['',[Validators.required]]
  });

  onFileChange(event:any):void{
    this.fotos=event.target.files;
    Array.from(this.fotos).forEach((file:File)=>{
      const fr= new FileReader();
      fr.onload=(evento:any)=>{
        const dataUrl=evento.target.result;
        this.urls.push(dataUrl);
      };
      fr.readAsDataURL(file);
    });
    //console.log(this.inputFiles.nativeElement);
  }

  onInputChange():void{
    //console.log(this.gatoForm.controls['inputFile']);
    const inputFile=this.gatoForm.controls['fotos'];
    inputFile.setValue(this.urls.length>0?this.urls[0]:'')
    inputFile.markAsTouched();
  }

  delete(i:number):void{
    if (i >= 0 && i< this.urls.length) {
      this.urls.splice(i, 1); 
      // Crear un nuevo array sin el elemento eliminado en this.fotos
      const newFotos: File[]  = Array.from(this.fotos).filter((_, index) => index !== i);
      this.fotos = newFotos;
      //console.log(this.fotos);
      this.onInputChange();
    }
  }

  nuevoGato():void{
    const gato:GatoDetalle=this.gatoForm.value;
    gato.fotos=[];
    const voluntario=new Voluntario();
    voluntario.email=this.user.email;
    gato.voluntario=voluntario;
    this.service.nuevoGato(gato,this.fotos)
    .subscribe({
      next:(response)=>{
        const nuevo:GatoDetalle=response.data;
        Swal.fire({
          title:nuevo.nombre+" fue cargada/o con exito!",
          icon:'success',
          html:'Puedes cargar su ficha ahora:'+
          '<a> Ir a ficha </a>'+
          'o cargarla luego desde el boton editar'
        })
      },
      error:(e)=>{
        console.error("Error al cargar el gatito", e);
      }
    })
  }

  cancelar():void{
    this.mostrarForm=false;
    this.mostrarFormChange.emit(this.mostrarForm);
  }
}
