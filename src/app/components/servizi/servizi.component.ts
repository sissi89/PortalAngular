import { getNsPrefix } from '@angular/compiler';
import { Component,  OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { ServiziService } from 'src/app/services/servizi.service';

import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss']
})
export class ServiziComponent implements OnInit {
  services:Service[]=[];
  nameColumn:string[]=['T','Compagnia','Fiduciario','Tipo Sinistro','Dt. Incarico'];
  nameColumnLessFiduciario:string[]=['T','Compagnia','Tipo Sinistro','Dt. Incarico'];
  nameColumn2:string[]=['Nr. Sinistro','Nr. Incarico','Prestazione richiesta','Assicurato','Controparte'];
  title = 'dataTableDemo';
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  red:number = 0;
  
  colors:Tipologia[]=[{
    "color":"red",
    "tipo":"Urgenze",
    
  },{
    "color":"yellow",
    "tipo":"Incarichi aperti",
    
  },{
    "color":"green",
    "tipo":"Incarichi chiusi"
  },{
    "color":"blue",
    "tipo":"Tutti gli incarichi"
  }]

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
      
    })
   
  }
  onTableDataChange(event:any) {
    this.page = event;
   
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
 
  }

  counter(color:string):number{
    // inizializzo il contatore
    let i = 0;
    this.services.filter((e:Service)=>{
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? i+=1 : i
    })
    return i
  }
  openDialog(id:string) {
    this.dialog.open(TabsComponent);
    localStorage.setItem('id',id)
  }
  
  getRole(){

   return localStorage.getItem('role');
   
  }
  // Fiduciario
  getTrustee(){
   
    return localStorage.getItem('fiduciario');
  }
 
  // numero sinistro 

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
 
 




}


