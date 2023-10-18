import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const atLeastOneFieldRequired: ValidatorFn = (control: AbstractControl) => {
    if (control instanceof FormGroup) {
        const fields = Object.keys(control.controls);
        const hasValue = fields.some(field => !!control.get(field)?.value);
        return hasValue ? null : { atLeastOneFieldRequired: true };
    }
    return null;
};

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    if (control instanceof FormGroup) {
      const password = control.get('contraseña')?.value;
      const confirmPassword = control.get('contraseñaConfirmada')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    return null;
};

export const fechaNacimientoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fechaNacimiento = new Date(control.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  if (edad < 18) {
    return { edadMenorDe18: true }; 
  }
  return null; 
}

export function provinciaValidator(provincias: { id: number, nombre: string }[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedProvincia = control.value;
    const foundProvincia = provincias.find(prov => prov.nombre === selectedProvincia);
    if (foundProvincia) {
      return null; // Valor válido
    } else {
      return { invalidProvincia: true }; // Valor no válido
    }
  };
}