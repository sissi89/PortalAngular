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
  serviziFiltered:Service[]=[]
  services:Service[]=[];
  fiduciari:any[]=[];
  constructor(private http:HttpClient) { }

  // sinistri operatore sogesa vede tutti
  getServicesOperator():Observable<Service[]>{
    console.log('service da operatore')
    return this.http.get<Service[]>(`${api}`);
  }

  // sinistro per operatore sogesa
  getServiceOperator(id:string):Observable<Service>{
    return this.http.get<Service>(`${api}/sinistro/${id}`)
  }

  // sinistro per  in base al fiduciario 
  getServiceById(id:string,username:string):Observable<Service>{
    console.log('service is running',`${api}/${id.trim()}`)
    return this.http.get<Service>(`${api}/${username}/${id}`)

  }

 // sinistri in base al fiduciario
  getAllServiceUsername(username:string):Observable<Service[]>{

   console.log(`${api}/${username}`)

    return this.http.get<Service[]>(`${api}/${username}`)

  }


  // numero sinistro fatta anche con una pipe
  getNumberleft(number:any):string{
    if(number){
      switch(number){
        case 1 :
          return number = 'R.C.A';
        case 2 :
          return  number= 'C.A.R.D'; 
        case 3 :
          return  number = 'C.V.T';
        default:
          return 'nAn';
      }

    }
 
    return number;
      

    
  }

 
}
