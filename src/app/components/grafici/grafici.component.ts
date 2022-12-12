import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.component.html',
  styleUrls: ['./grafici.component.scss'],
})
export class GraficiComponent implements OnInit {
pieChartOptions: any;
  
  constructor(private service: ServiziService, private auth: AuthService) {}
  // Pie
  public chart: any;
 

  
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit(): void {
    console.log(this.service.services, 'grafici');
    console.log(this.service.serviziFiltered, ' grafici 2');
    console.log(this.counter('red'));

    this.createChart();
  }

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

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue',
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
