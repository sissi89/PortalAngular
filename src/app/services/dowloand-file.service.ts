import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const { uplaodFile} = environment;
@Injectable({
  providedIn: 'root'
})
export class DowloandFileService {

  constructor(public http:HttpClient){}
  // getFilePdf
  // da http 
  getFilePdf(fileName:string):Observable<any>{
    return this.http.get<any>(`${uplaodFile}/${fileName}/.pdf`);

  }

  // getFile binario 

  
  
  // da binario stream da json con i file stringa binaria 

  

}
