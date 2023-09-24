import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaVeterinaria } from 'src/app/models/FichaVeterinaria';
import { GatoDetalle } from 'src/app/models/GatoDetalle';
import { GatosService } from 'src/app/services/gatos.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { atLeastOneFieldRequired } from '../../validators/validators';

@Component({
  selector: 'app-ficha-gato',
  templateUrl: './ficha-gato.component.html',
  styleUrls: ['./ficha-gato.component.css']
})
export class FichaGatoComponent {
  @Input() ficha:FichaVeterinaria=new FichaVeterinaria();
  pdf:File|undefined;

  constructor(private fb:FormBuilder,
    private service:GatosService, 
    private ruta: ActivatedRoute,
    private router:Router){

  }

  public fichaForm:FormGroup=this.fb.group({
    ultimaDesparasitacion:['',[this.fechaPasada()]],
    ultimaTripleFelina:['',[this.fechaPasada()]],
    ultimaAntirrabica:['',[this.fechaPasada()]],
    comentarios:[''],
    pdf:['']
  },{validators:[atLeastOneFieldRequired]});

  fechaPasada(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaIngresada = new Date(control.value);
      const fechaActual = new Date();
      const fechaLimite = new Date();
      fechaLimite.setFullYear(fechaActual.getFullYear() - 25);
      const fechaIngresadaMs = fechaIngresada.getTime();
      const fechaActualMs = fechaActual.getTime();
      const fechaLimiteMs = fechaLimite.getTime(); 
      if (fechaIngresadaMs > fechaActualMs || fechaIngresadaMs < fechaLimiteMs) {
        return { 'fechaPasada': true }
      }else{
        return null;
      }
    };
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const pdfFile: File = fileList[0];
      this.pdf = pdfFile; 
    }
  }


  asociarFicha():void{
    const id= this.ruta.snapshot.params['id'];
    const ficha:FichaVeterinaria=this.fichaForm.value;
    this.service.asignarFicha(id,this.pdf,ficha).subscribe({
      next:(response)=>{
        const gato:GatoDetalle=response.data;
        this.sweetalert('success',
        'Genial!',
        `La ficha de ${gato.nombre} se cargo con exito!`,
        2000
        )
        this.router.navigate(['/backoffice/misgatos']);
      },
      error:(e)=>{
        //console.error("Error al enviar la ficha", e);
        this.sweetalert('error','Algo ocurrio',e.mensaje,undefined);
      }
    })
  }

  sweetalert(icon:string,title?:string,text?:string,timer?:number):void{
    Swal.fire({
      icon: icon as SweetAlertIcon,
      title: title,
      text:text,
      showConfirmButton:true,
      timer:timer
    });
  }

  //cuando existe ficha
  ngOnChanges(changes:SimpleChanges){
    if(changes['ficha'] && !changes['ficha'].firstChange){
      this.saveFicha();
    }
  }

  private saveFicha():void{
    this.fichaForm.patchValue({
      ultimaDesparasitacion:this.ficha.ultimaDesparasitacion,
      ultimaTripleFelina:this.ficha.ultimaTripleFelina,
      ultimaAntirrabica:this.ficha.ultimaAntirrabica,
      comentarios:this.ficha.comentarios,
      //pdf:this.ficha.pdf
    })
  }

  descargarPdf():void{
    
  }

}
