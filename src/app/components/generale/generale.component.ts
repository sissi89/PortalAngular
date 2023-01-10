import { Component, OnInit } from '@angular/core';
import { Detail } from 'src/app/model/Detail';
import { ServiceReal } from 'src/app/model/model';
//import { Service } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-generale',
  templateUrl: './generale.component.html',
  styleUrls: ['./generale.component.scss']
})
export class GeneraleComponent implements OnInit {
  service:Detail | undefined ;
  incarico:ServiceReal | undefined;
  fiduciario:string | null = '';
  names:string[]=['Fiduciario',	' Compagnia'	,	'Data chiusura	',' Data incarico',		'Numero sinistro	'	];
  names2:string[]=['Assicurato','Tipo_sinistro','Targa_assicurato','Controparte','Targa controparte'];
   constructor(public serviziService:ServiziService , public authService:AuthService, public _snackbar: ToastService) { }
 
   ngOnInit(): void {

    // this.getId();
     let user = this.authService.userValue;
     console.log(user?.id)
   //this.getIdAndUsername()
   this.getService();
   }
   getIdAndUsername(){
    //console.log('id ciaoooo')
     console.log(localStorage.getItem('id'))
     let id = localStorage.getItem('id');
     let user = this.authService.userValue;

     if(id !=null && user?.username != null){
     
    return this.getIncarico(id);
     } else{
      this._snackbar.snackBar('id o user non inseriti','bg-danger')
     }
 
    
 
   }
 


/*    getService(id:any,username:string){
    let user = this.authService.userValue;

    // ruolo fiduciario
    if(user && user.role === 2){
      this.serviziService.getServiceById(id,username).subscribe(data=>{
        console.log('servicet:',data)
        this.service = data
        console.log(this.service.documents)
      })

      // ruolo operatore sogesa
    }else if(user && user.role === 1){
      this.serviziService.getServiceOperator(id).subscribe(data =>{
        console.log('service:',data)
        this.service = data
      })
    }
   
   } 
  */
   getIncarico(idInc:string){
    
    this.fiduciario = localStorage.getItem('fiduciario');
    this.serviziService.getDettailSx(idInc).subscribe((data:Detail)=>{
      console.log('incarico:',data)
      this.service = data;
    }
      
    )
    
   }
   
   getService(){
    var retrievedObject  = localStorage.getItem('Incarico');
    //JSON.parse
 this.incarico =  retrievedObject &&  JSON.parse(retrievedObject);
 //  console.log(this.incarico.nomePer,'nome per')
  //  retrievedObject && console.log('uuuuuu',JSON.parse(retrievedObject))
   }
 
   
 
 
 }
 
