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
   role = 'rolefake.json';
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

}
