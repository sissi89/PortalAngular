import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeUrgency'
})
export class TypeUrgencyPipe implements PipeTransform {

  transform(string: number):any{
    switch(string){
      case 1: 
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
        case 4:
          return 'grey';
        case 5:
          return 'brown';
      default:
        return 'NaN';
      
    }
 
  }

}
