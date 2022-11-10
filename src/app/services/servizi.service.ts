import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../model/model';
const { api } = environment;
@Injectable({
  providedIn: 'root'
})
export class ServiziService {

  constructor(private http:HttpClient) { }

  getAllService():Observable<Service[]>{
    return this.http.get<Service[]>(api);
  }

}
