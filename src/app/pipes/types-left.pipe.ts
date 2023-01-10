import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typesLeft',
})
/* 0	RCA/INF. GENERICA
1	RCA
2	RCA/CID
3	FURTO
4	INCENDIO
5	KASKO
6	EVENTI SOCIO POLITICI
7	EVENTI ATMOSFERICI
8	CRISTALLI
9	ACCORDI PLURIMI
10	VARI
11	RCA RISC. ASS.
12	RCA/CID RISC. CTP.
13	RCA/INF. GENERICA
14	RCA/INF. AUTORITA
15	RAMI ELEMENTARI
16	CARD monofirma
17	CARD doppia firma
18	RCT/COSE
81	CTU
 */
export class TypesLeftPipe implements PipeTransform {
  // tipo sinistro
  transform(number: number): string {
    switch (number) {
      case 0:
        return "RCA/INF.GENETICA";
      case 1:
        return "RCA"
      case 2:
        return "RCA/CID"
      case 3:
        return "FURTO"
      case 4:
        return "INCENDIO"
      case 5:
        return "KASKO"
      case 6:
        return "EVENTI SOCIO POLITICI"
      case 7:
        return "EVENTI ATMOSFERICI"
      case 8:
        return "CRISTALLI"
      case 9:
        return "ACCORDI PLURIMI"
      case 10:
        return "VARI"
      case 11:
        return "RCA RISC. ASS"
      case 12:
        return "RCA/CID RISC. CTP."
      case 13:
        return "RCA/INF. GENERICA"
      case 14:
        return "RCA/INF AUTORITA"
      case 15:
        return "RAMI ELEMENTARI"
      case 16:
        return "CARD monofirma"
      case 17:
        return "CARD doppio firma"
      case 18:
        return "RTC/COSE"
      case 81:
        return "CTU"
      default:
        return " non presente"
    }
  }
}


