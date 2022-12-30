import { Component, OnInit, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { ServiceReal } from 'src/app/model/model';
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
  label: string = '';
  colors2 = ['red', 'yellow', 'green'];
  types = ['Urgenze', ' Aperti', ' Chiusi']
  number = 0;
  constructor(private service: ServiziService, private auth: AuthService) { }
  // Pie
  public chartPie: any;
  public chartLine: any;
  colors: Tipologia[] = [
    {
      color: 'red',
      tipo: 'Urgenze',
      value: this.counter(1),
      num: 1

    },
    {
      color: 'yellow',
      tipo: ' Aperti',
      value: this.counter(2),
      num: 2
    },
    {
      color: 'green',
      tipo: ' Chiusi',
      value: this.counter(3),
      num: 3
    },
  ];






  ngOnInit(): void {
    this.createChartPie();
    this.createChartLine();
    this.service.services;
    //console.log(this.arr)
  }

  // contatore urgenze
  counter(color: number): number {
    // inizializzo il contatore
    let i = 0;
    this.service.serviziFilterered.filter((e: ServiceReal) => {
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? (i += 1) : i;
    });
    //  console.log(i)
    return i;
  }


  // a torta con valori dei contatori
  createChartPie() {
    this.chartPie = new Chart('ChartPie', {
      type: 'pie',
      data: {
        labels:
          this.colors.map(item => item.tipo)
        ,
        datasets: [{
          label: '',
          data: this.colors.map(item => item.value), // valori dei contatori
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
        maintainAspectRatio: false,
      }


    });
  }
  //linea temporale con dati da inserire da prendere dall api 

  createChartLine() {
    this.chartLine = new Chart('ChartLine', {
      type: 'line',
      data: {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile'],
        datasets: [{
          label: 'quello che vuoi',
          data: ['25', '30', '20', '35'], // differenza tra 2 dati tra data incarico e data fine incarico
          fill: false,
          borderColor: 'red',
          tension: 0.1
        }]
      }
    })
  }



}
