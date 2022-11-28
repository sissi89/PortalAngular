
import { Component,  OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Service } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { ServiziService } from 'src/app/services/servizi.service';
import { FilterComponent } from '../filter/filter.component';

import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss']
})
export class ServiziComponent implements OnInit {
  services:Service[]=[];
  nameColumn:string[]=['T','Compagnia','Fiduciario','Tipo Sinistro','Dt. Incarico','Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  nameColumnLessFiduciario:string[]=['T','Compagnia','Tipo Sinistro','Dt. Incarico','Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  nameColumn2:string[]=['Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  title = 'dataTableDemo';
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  red:number = 0;
  atBottom:boolean = false;
  today=moment(new Date()).format("YYYY-MM-DD");
  colors:Tipologia[]=[{
    "color":"red",
    "tipo":"Urgenze",
    
  },{
    "color":"yellow",
    "tipo":"Incarichi aperti",
    
  },{
    "color":"green",
    "tipo":"Incarichi chiusi"
  }/*, {
    "color":"blue",
    "tipo":"Tutti gli incarichi"
  } */]
  // servizi filtrati
 servicesFilter:Service[]=[];
  constructor(public service:ServiziService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadServizi();
   // this.services
 
   
  }


  loadServizi(){
    this.getRole();
   // console.log('role',this.role)
    this.service.getAllService().subscribe(data=>{
      console.log('data:',data);
      this.services = data;
      console.log('services:',this.services)
      this.servicesFilter = data;
      console.log(data)
      
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
    this.services.filter((e:Service)=>{
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? i+=1 : i
    })
    console.log(i)
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
  // ruolo
  getRole(){
 return Number(localStorage.getItem('role'));
   
  }
  // Fiduciario
  getTrustee(){
   
    return Number(localStorage.getItem('fiduciario'));
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
          return 'nnnn';
      }

    }
 
    return number;
      

    
  }

  // mostrare il scroll
  checkthis(e:any){
    console.log(e.target.offsetHeight , 
                e.target.scrollHeight , 
                e.target.scrollTop,
                e.target.offsetHeight);
    if(e.target.scrollWidth < e.target.scrollLeft +e.target.offsetWidth) {
      // not scrollable
      this.atBottom = false;
    } else {
      // is scrollable
      this.atBottom = true;
    }

   
  }
 
  // filtro per i contatori
  serviceFilter(tipo:string){
  
    this.servicesFilter = this.services.reduce((filters:Service[],service:Service)=>{
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




}

