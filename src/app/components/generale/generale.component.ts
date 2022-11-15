import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';

@Component({
  selector: 'app-generale',
  templateUrl: './generale.component.html',
  styleUrls: ['./generale.component.scss']
})
export class GeneraleComponent implements OnInit {
  service:Service | undefined;
  names:string[]=['Fiduciario',	' Compagnia'	,	'Data chiusura	',
  ' Data incarico',		
   'Numero sinistro	'	
   ];
  names2:string[]=['Assicurato','Tipo_sinistro','Targa_assicurato','Controparte','Targa controparte'];
   constructor(public serviziService:ServiziService) { }
 
   ngOnInit(): void {
 
   console.log(this.service)
     this.getId();
  
    /*  <h4>{{service?.assicurato}}</h4>
     <h4>{{service?.tipo_sinistro}}</h4>
     <h4>{{service?.targa_assicurato}}</h4>
     <h4>{{service?.controparte}}</h4>
     <h4>{{service?.targa_controparte}}</h4> */
   
 
 
 
     
   }
   getId(){
     console.log(localStorage.getItem('id'))
     let id = localStorage.getItem('id');
     if(id !=null){
       return this.getService(id)
     }
    
 
   }
 
   getService(id:string){
     this.serviziService.getServiceById(id).subscribe(data=>{
      console.log('sono richiamata',data)
       
       
       this.service = data;
       console.log(this.service)
     })
     
   }
 
 
 
 }
 
