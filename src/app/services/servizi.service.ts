import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth';
import { Service } from '../model/model';

const { api, auth , api2} = environment;
@Injectable({
  providedIn: 'root'
})

export class ServiziService {
  serviziFiltered:Service[]=[]
  services:Service[]=[];
  constructor(private http:HttpClient) { }

  /*getAllService():Observable<Service[]>{
    console.log('service is running')
    return this.http.get<Service[]>(api);
  }*/
  getServiceById(id:string,username:string):Observable<Service>{
    console.log('service is running',`${api2}/${id.trim()}`)
    return this.http.get<Service>(`${api2}/${username}/${id}`)

  }

  getAllServiceUsername(username:string):Observable<Service[]>{

   console.log(`${api}/${username}`)

    return this.http.get<Service[]>(`${api}/${username}`)

  }

  // get service username and id

  /*getServiceUsernameandId(username:string,id:number):Observable<Service>{
    console.log('service is nunnig')
    return this.http.get<Service>(`${api}/${username}`)
  }*/
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

  getProva(){
    console.log('server fake')
    this.http.get('http://localhost:4000/prova');
  }
}
