import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-validation',
  templateUrl: './error-validation.component.html',
  styleUrls: ['./error-validation.component.css']
})
export class ErrorValidationComponent {
  @Input() form: FormGroup | undefined; 
  @Input() field: string=''; 

  isValidField(field:string, form:FormGroup):boolean | null{
    return form.controls[field].errors &&
      form.controls[field].touched;
  }

  getFieldError(field:string,form:FormGroup):string | null{
    if(!form.controls[field]) return null;
    const errors=form.controls[field].errors || {};
    //console.log(errors);
    for (const key in errors) {
      switch(key){
        case 'required': return `El campo ${field} es requerido`;
        case 'minlength': return `Minimo ${errors['minlength']['requiredLength']} caracteres`;
        case 'edadMenorDe18': return 'Debes ser mayor de 18 años.';
        case 'min': return `El valor debe ser mayor a ${errors['min']['min']}`;
        case 'fechaPasada': return "La fecha debe ser valida";
        case 'invalidValue': return "Selecciona un valor de la lista";
        case 'pattern':
          const requiredPattern = errors['pattern']['requiredPattern'];
          if(requiredPattern=='^[A-Za-z]+$'){
            return "El campo solo admite letras";
          }else if(requiredPattern=='^[A-Za-z ]+$'){
            return "El campo solo admite letras y espacios";
          }else if(requiredPattern=='^[A-Za-z0-9 ]+$'){
            return "El campo admite numeros, letras y espacios";
          }else if(requiredPattern=='^[0-9]{8}$'){
            return 'El campo debe contener 8 numeros'
          }else if(requiredPattern=='^[0-9]+$'){
            return 'El campo acepta solo numeros'
          };
      }
    }
    return null;
  }

}
