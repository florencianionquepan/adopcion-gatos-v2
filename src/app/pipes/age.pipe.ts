import { Pipe, PipeTransform } from '@angular/core';

Pipe({name: 'age'})

export class AgePipe implements PipeTransform{
    transform(fechaNacimiento:Date) :number{
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }

    return age;
    }
}