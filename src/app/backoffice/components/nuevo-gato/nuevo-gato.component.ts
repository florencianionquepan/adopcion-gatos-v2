import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatosService } from 'src/app/services/gatos.service';

@Component({
  selector: 'app-nuevo-gato',
  templateUrl: './nuevo-gato.component.html',
  styleUrls: ['./nuevo-gato.component.css']
})
export class NuevoGatoComponent {

  constructor(private fb:FormBuilder, private service:GatosService) {
  }

  public gatoForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    edad:['',[Validators.required]],
    sexo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    color:['',[Validators.required]],
    tipoPelo:['',[Validators.required]],
    foto:['',[Validators.required]]
  });

  agregarInputFoto():void{

  }

  nuevoGato():void{

  }

}
