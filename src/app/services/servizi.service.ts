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
  serviziFiltered:Service[]=[]
  constructor(private http:HttpClient) { }

  getAllService():Observable<Service[]>{
    return this.http.get<Service[]>(api);
  }
  getServiceById(id:string):Observable<Service>{
    return this.http.get<Service>(`${api}/${id}`)

  }

  getRole():Observable<any>{
    return this.http.get<any>(auth)
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
