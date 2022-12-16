import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';
import { Service } from '../model/model';

const { api, auth } = environment;
@Injectable({
  providedIn: 'root'
})

export class ServiziService {
  // variabili di appoccio per evitare di fare chiamate a ogni filtro
  serviziFiltered: Service[] = []
  services: Service[] = [];
  fiduciari: any[] = [];
  constructor(private http: HttpClient) { }

  // sinistri operatore sogesa vede tutti
  getServicesOperator(): Observable<Service[]> {
    console.log('service da operatore')
    return this.http.get<Service[]>(`${api}`);
  }

  // sinistro per operatore sogesa  get id back
  getServiceOperator(id: string): Observable<Service> {
    console.log(`${api}/sinistro/`, { id })
    id = id.trim(); // per eliminare gli spazi di una stringa
    
    return this.http.post<Service>(`${api}/sinistro/`, { id })
  }

  // sinistro per  in base al fiduciario 
  getServiceById(id: string, username: string): Observable<Service> {
    // trim rimuove gli spazi di una stringa 
    console.log('service is running', `${api}/sinistroFiduciario`, { id, username })
    // primo parametro url e secondo il body
    return this.http.post<Service>(`${api}/sinistroFiduciario`, { id, username })

  }

  // sinistri in base al fiduciario
  getAllServiceUsername(username: string): Observable<Service[]> {

    console.log(`${api}/fiduciario`, { username })

    return this.http.post<Service[]>(`${api}/fiduciario`, { username })

  }


  // numero sinistro fatta anche con una pipe
  getNumberleft(number: string): string {
    if (number) {
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

    return number;



  }


}
