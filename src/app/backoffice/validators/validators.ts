import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export const atLeastOneFieldRequired: ValidatorFn = (control: AbstractControl) => {
    if (control instanceof FormGroup) {
        const fields = Object.keys(control.controls);
        const hasValue = fields.some(field => !!control.get(field)?.value);
        return hasValue ? null : { atLeastOneFieldRequired: true };
    }
    return null;
};