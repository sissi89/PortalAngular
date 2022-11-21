import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typesLeft',
})
export class TypesLeftPipe implements PipeTransform {
  transform(number: any): string {
    switch (number) {
      case 1:
        return number = 'RCA';

      case 2:
        return number = 'C.A.R.D';

      case 3:
        return number = 'C.V.T.';
      default:
        return ' Non presente ';
    }
  }
}
