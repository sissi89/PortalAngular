import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { ServiziService } from 'src/app/services/servizi.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss']
})
export class ServiziComponent implements OnInit {
  services:Service[]=[];
  nameColumn:string[]=['Tipo','Comp','Fiduciario','Tipo Sinistro','Dt. Incarico','Nr. Sinistro',
  'Nr. Incarico','Prestazione richiesta','Assicurato','Targa assicurato','Controparte','Targa Controparte',
  'Nr. interno','Dt. ultm. int'];
  title = 'dataTableDemo';

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  red:number =0;
  //colors:string[]=['red','green','blue','yellow']
  colors:Tipologia[]=[{
    "color":"red",
    "tipo":"Urgenze",
    
  },{
    "color":"yellow",
    "tipo":"Incarichi aperti",
    
  },{
    "color":"green",
    "tipo":"Incarichi chiusi"
  }]

  constructor(public service:ServiziService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadServizi();
    
  }


  loadServizi(){
    this.service.getAllService().subscribe(data=>{
      console.log('data:',data);
      this.services = data;
      console.log('services:',this.services)
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
   
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
 
  }

  counter(color:any):number{
    // inizializzo il contatore
    let i = 0;
    this.services.filter((e:Service)=>{
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? i+=1 : i
    })
    return i
  }
  openDialog() {
    this.dialog.open(LoginComponent);
    
  }

}

