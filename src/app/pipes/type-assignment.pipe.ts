import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeAssignment'
})
export class TypeAssignmentPipe implements PipeTransform {

  transform(number:number):string {
    switch(number){
      case 1:
        return "PERIZIA AUTO"
      case 2:
        return "PERIZIA AUTO RISCONTRO"
      case 3:
        return "INFORMATIVA"
      case 4:
        return "PERIZIA MEDICA"
      case 5:
        return "PERIZIA RAMI ELEMENTARI"
      default:
        return " non presente"
      
    }
  }

}
