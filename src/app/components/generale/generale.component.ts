import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';

@Component({
  selector: 'app-generale',
  templateUrl: './generale.component.html',
  styleUrls: ['./generale.component.scss']
})
export class GeneraleComponent implements OnInit {
  service:Service | undefined;
  names:string[]=['Fiduciario',	' Compagnia'	,	'Data chiusura	',' Data incarico',		'Numero sinistro	'	];
  names2:string[]=['Assicurato','Tipo_sinistro','Targa_assicurato','Controparte','Targa controparte'];
   constructor(public serviziService:ServiziService , public authService:AuthService) { }
 
   ngOnInit(): void {

    // this.getId();
     let user = this.authService.userValue;
     console.log(user?.id)
   this.getIdAndUsername()
   }
   getIdAndUsername(){
    //console.log('id ciaoooo')
     console.log(localStorage.getItem('id'))
     let id = localStorage.getItem('id');
     let user = this.authService.userValue;

     if(id !=null && user?.username != null){
     
      // return this.getService(id)
      return this.getService(id)
     } 
 
    
 
   }
 
  /*  getService2(id:string){
    console.log('id ciaoooo')
     this.serviziService.getServiceById(id).subscribe(data=>{
      console.log('sono richiamata',data)
   
      this.service = data;
     //  console.log(this.service)
     })
     

   } */

   getService(id:any){
    console.log('ciooooooooooooooooooooooo')
    this.serviziService.getServiceById(id).subscribe(data=>{
      console.log(data)
      this.service = data
    })
   }
   
 
   
 
 
 }
 
