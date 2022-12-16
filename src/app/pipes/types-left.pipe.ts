import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typesLeft',
})
export class TypesLeftPipe implements PipeTransform {
  transform(number: any): string {
    switch (number) {
      case "1":
        return number = 'RCA';

      case "2":
        return number = 'C.A.R.D doppia firma';

      case "3":
        return number = 'C.V.T.';
      case "4":
        return number = "Accordi Plurimi";
      case "5":
        return number = "Card monofirma";
      case "6":
        return number = "Amministrativo";
      case "7":
        return number = "Cristalli";
      case "8":
        return number = "CTU";
      case "9":
        return number = "Eventi Atmosferici";
      case "10":
        return number = "Eventi Socio Politici";
      case "11":
        return number = "Furto";
      case "12":
        return number = "Incendio";
      case "13":
        return number = "Kasko";
      case "14":
        return number = "Rami elementari";
      case "15":
        return number = "Rca Risc ASS.";
      case "16":
        return number = "Rca/Cid";
      case "17":
        return number = "Rca/Cid Risc ctp";
      case "18":
        return number = "Rca/Inf. Autorita";
      case "19":
        return number = "Rca/inf Genetica";
      case "20":
        return number = "Rtc/Cose";
      default:
        return ' Non presente ';
    }
  }
}


