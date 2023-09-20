import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FichaVeterinaria } from 'src/app/models/FichaVeterinaria';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-ficha-gato',
  templateUrl: './ficha-gato.component.html',
  styleUrls: ['./ficha-gato.component.css']
})
export class FichaGatoComponent {
  ficha:FichaVeterinaria=new FichaVeterinaria();

  constructor(private fb:FormBuilder,
    private service:GatosService, 
    private ruta: ActivatedRoute){

  }

  public fichaForm:FormGroup=this.fb.group({
    ultimaDesparasitacion:['',[this.fechaPasada()]],
    ultimaTripleFelina:['',[this.fechaPasada()]],
    ultimaAntirrabica:['',[this.fechaPasada()]],
    pdf:['',[Validators.required]],
  });

  fechaPasada(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaIngresada = new Date(control.value);
      const fechaActual = new Date();
      const fechaLimite = new Date();
      fechaLimite.setFullYear(fechaActual.getFullYear() - 25); // Restar 25 años a la fecha actual
  
      if (fechaIngresada <= fechaActual && fechaIngresada >= fechaLimite) {
        return null; // La fecha es válida (dentro del rango permitido)
      } else {
        return { 'fechaPasada': true }; // La fecha está fuera del rango permitido
      }
    };
  }


  asociarFicha():void{
    const id= this.ruta.snapshot.params['id'];
    this.service.asignarFicha(id,this.ficha).subscribe(resp=>{
      console.log(resp);
    })
  }
}
