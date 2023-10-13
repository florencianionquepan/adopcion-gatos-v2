import { Pipe, PipeTransform } from '@angular/core';
import { Transito } from '../models/Transito';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): Transito[] {
    if(arg==='' || arg.length<3) return value;
    const resultTransitos=[];
    for(const transito of value){
      if(transito.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultTransitos.push(transito);
      }
    }
    return resultTransitos;
  }

}
