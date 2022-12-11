import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiduciario'
})
export class FiduciarioPipe implements PipeTransform {

  transform(string: string): string {
    switch (string) {
      case "0001":
        return string = 'Rossi';

      case "0002":
        return string = 'Bianchi';

      default:
        return ' Non presente ';
    }
  }

}
