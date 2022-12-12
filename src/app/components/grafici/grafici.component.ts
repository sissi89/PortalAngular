import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import Chart from 'chart.js/auto';
import { Tipologia } from 'src/app/model/tipo';
@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.component.html',
  styleUrls: ['./grafici.component.scss'],
})
export class GraficiComponent implements OnInit {
pieChartOptions: any;
 label:string = ''; 
 number = 0;
  constructor(private service: ServiziService, private auth: AuthService) {}
  // Pie
  
  public chartPie : any;
  colors: Tipologia[] = [
    {
      color: 'red',
      tipo: 'Urgenze',
    },
    {
      color: 'yellow',
      tipo: ' Aperti',
    },
    {
      color: 'green',
      tipo: ' Chiusi',
    },
  ];

  

  ngOnInit(): void {
   this.createChartPie();
  }

  // numero tipi servizi
  counter(color: string): number {
    // inizializzo il contatore
    let i = 0;
    this.service.serviziFiltered.filter((e: Service) => {
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? (i += 1) : i;
    });
    //  console.log(i)
    return i;
  }
 

  // a torta con valori dei contatori

  createChartPie(){
    this.chartPie = new Chart('ChartPie',{
      type : 'pie',
      data : {
        labels: 
          this.colors.map(item =>  item.tipo  )
        ,
        datasets: [{
          label: '',
          data: [this.counter('red'),this.counter('green'),this.counter('yellow')],
        // data:[3,2,1],
          backgroundColor: [
            'red',
            'green',
            'yellow'
          ],
        //  hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,}
        
    
    });
  }
}
