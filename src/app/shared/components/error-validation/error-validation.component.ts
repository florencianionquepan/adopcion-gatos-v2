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
      }
    }
    return null;
  }

}
