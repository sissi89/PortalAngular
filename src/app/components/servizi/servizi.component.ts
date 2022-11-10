import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';

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

  constructor(public service:ServiziService) { }

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
    this.loadServizi();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadServizi();
  }

}
