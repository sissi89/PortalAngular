import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';
import { Detail } from '../model/Detail';
import { Doc } from '../model/doc';
import {  ServiceReal } from '../model/model';
import { firstValueFrom } from 'rxjs' ;
const { api, auth } = environment;
@Injectable({
  providedIn: 'root'
})

export class ServiziService {
  // variabili di appoccio per evitare di fare chiamate a ogni filtro

  services: ServiceReal[] = [];
  serviziFilterered: ServiceReal[] = [];
  fiduciari: any;
  // pagination
  page:number = 1;
  isFilter:boolean = false;
  constructor(private http: HttpClient) { }
  //---- nuovi metodi con api di treglia ----//
  // Incarichi per Sx:
  getServiceIncarichiFiduciari(sinistro: string): Observable<ServiceReal> {
    console.log('url', `${api}/incarichiPer/${sinistro}`);
    return this.http.get<ServiceReal>(`${api}/incarichiPer/${sinistro}`);
  }
  // Tutti i SX ( per data ):
/*   getServiceIncarichiWithDate(start: string, end: string): Observable<ServiceReal[]> {
    console.log('url', `${api}/${start}/${end}`);
    return this.http.get<ServiceReal[]>(`${api}/${start}/${end}`);
  } */
  getServiceIncarichiWithDate(start:string,end:string):Observable<ServiceReal[]>{
    console.log('url',api)
    return this.http.post<ServiceReal[]>(api,{start, end})
    
  }
  // prova con le promise
  getServiceIncarichiWithDate2(start:string,end:string) {
    console.log('url',api,'with',start,'e',end)
    // firstValueFrom https://www.youtube.com/watch?v=3aeK5SfWBSU&ab_channel=TariqSaeed
    return this.http.post<ServiceReal[]>(api,{start, end}).toPromise() as Promise<ServiceReal[]>
    
  }
  // get dettaglio incarico

  getDettailSx(idInc: string): Observable<Detail> {
    //incarichi/{idInc}

    console.log('service is running ', `${api}/incarichi`)
    return this.http.post<Detail>(`${api}/incarichi`,{idInc});
  }
  // docuemnti di tutti gli incarichi
  getDocumentsInc(idInc: string): Observable<Doc[]> {
    //http://localhost:4000/sinistri/incarichi/documents/_SO2255549

    return this.http.post<Doc[]>(`${api}/incarichi/documents`,{idInc});

  }
  // prova con le promise 
  getDocumentsInc2(idInc:string){
    return  this.http.post<Doc[]>(`${api}/incarichi/documents`,{idInc}).toPromise();
  }
  // downloand doc
  downSingleDocument(idInc: string): Observable<any> {
    //http://localhost:4000/sinistri/documents/singolo/8498499
    console.log('service is running ', `${api}/documents/singolo/${idInc}&down`)
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get<any>(`${api}/documents/singolo/${idInc}&down`, {
      headers: headers, responseType: 'blob' as 'json',
      // responseType: "blob"
    });
  }
  //------- sinistri con vecchie api --------//
  // sinistro per  in base al fiduciario 
 /*  getServiceById(id: string, username: string): Observable<Service> {
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

 */
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

  // genera numeri random per il stato incarico
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
