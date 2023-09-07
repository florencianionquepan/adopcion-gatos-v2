import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  vistaActual:number=1;

  public registerForm:FormGroup=this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    fechaNacimiento:['',[Validators.required,this.fechaNacimientoValidator()]],
    dni:['',[Validators.required]],
    provincia:['',[Validators.required]],
    localidad:['',[Validators.required]],
    direccion:['',[Validators.required]],
    telefono:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]],
  });

  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaNacimiento = new Date(control.value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      if (edad < 18) {
        return { edadMenorDe18: true }; 
      }
      return null; 
    };
  }

  constructor(private fb:FormBuilder) {
  }

  continuar():void{
    this.vistaActual=2;
  }

  anteriorVista():void{
    this.vistaActual=1;
  }

}
