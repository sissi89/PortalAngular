
import { Component,  OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { Service } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import { FilterComponent } from '../filter/filter.component';

import { TabsComponent } from '../tabs/tabs.component';
import { TypeLeftComponent } from '../type-left/type-left.component';

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss']
})
export class ServiziComponent implements OnInit {
 // services:Service[]=[];
  selectedItems:[]=[];
  selectedFiduciario:string = '';
  nameColumn:string[]=['T','Compagnia','Fiduciario','Tipo Sinistro','Dt. Incarico','Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  nameColumnLessFiduciario:string[]=['T','Compagnia','Tipo Sinistro','Dt. Incarico','Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  nameColumn2:string[]=['Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  fiduciari:any[]=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  red:number = 0;
  today=moment(new Date()).format("YYYY-MM-DD");
  colors:Tipologia[]=[{
    "color":"red",
    "tipo":"Urgenze",
  },{
    "color":"yellow",
    "tipo":" Aperti",
  },{
    "color":"green",
    "tipo":" Chiusi"
  }]/*, {
    "color":"blue",
    "tipo":"Tutti gli incarichi"
  } ]*/
  

  constructor(public service:ServiziService, public dialog: MatDialog, public authService:AuthService) { }


  ngOnInit(): void {
    this.loadServizi();
   // this.services
this.getFiduciari();

   console.log(this.service.serviziFiltered)

  
   
  }

 
  loadServizi(){
    this.getRole();
   // console.log('role',this.role)
    this.service.getAllService().subscribe((data)=>{
     // console.log('data:',data[0].fiduciario);
     this.service.services = data;
    
     // console.log('services:',this.services)
      this.service.serviziFiltered = data;
    //  console.log(data)
    console.log('primaaaaaaa',this.fiduciari)
   this.fiduciari =   data.reduce((arr:any,item:any)=>{
     console.log('1',item.fiduciario)
     arr.includes(item.fiduciario) ?     console.log('non include') :  arr.push(item.fiduciario)
     
 
    return arr
    },[]) 
 

 
 
    })
  
  }
  onTableDataChange(event:number) {
    this.page = event;
   
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
 
  }
// contatore
  counter(color:string):number{
    // inizializzo il contatore
    let i = 0;
    this.service.serviziFiltered.filter((e:Service)=>{
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? i+=1 : i
    })
  //  console.log(i)
    return i
    
  }

  // modal general
  openDialog(id:string) {
    this.dialog.open(TabsComponent);
    localStorage.setItem('id',id)
  }
  // modal filtro data
  openDialogFilter(){
    this.dialog.open(FilterComponent)
  }
  openDialogFilterLeftType(){
    this.dialog.open(TypeLeftComponent)
  }
  // ruolo
  getRole(){
    // return Number(localStorage.getItem('role'));
    let user = this.authService.userValue;

    if(user?.role){
    return Number(user.role) 
    }else{
      return 0
    }

   
  }
  // Fiduciario
  getTrustee(){
   
    return Number(localStorage.getItem('fiduciario'));
  }

  openDialogFilterTipoSinistro(){

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


 
  // filtro per i contatori
  serviceFilter(tipo:string){
   // this.service.serviziFiltered = this.service.services;
    this.service.serviziFiltered = this.service.serviziFiltered.reduce((filters:Service[],service:Service)=>{
  // se è uguale a quello che stiamo cercando allora l ho inseriamo nell array
       (service.tipo === tipo ) && filters.push(service)

      return filters 
    },[])

 

  }

 
 // tutti gli incarichi
  all(){
    // richiamo tutti i servizi
  return this.loadServizi();
  }



filterFiduciario(){
  console.log(' selectedFiduciario:', this.selectedFiduciario)
}
/* uniqueArray = a.filter(function(item, pos) {
  return a.indexOf(item) == pos;
}) */
getFiduciari(){
  
 let arr = this.service.serviziFiltered.filter((item:Service,pos:any)=>{
    this.service.serviziFiltered.indexOf(item)== pos;

  })

  return  this.fiduciari = arr.map(item =>{
    item.fiduciario
  })


}

filterForFiduciario(){
  // fare un filtro per fiduciari 
}


}

