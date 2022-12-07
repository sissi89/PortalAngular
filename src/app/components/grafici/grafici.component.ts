import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';

@Component({
  selector: 'app-grafici',
  templateUrl: './grafici.component.html',
  styleUrls: ['./grafici.component.scss']
})
export class GraficiComponent implements OnInit {

  constructor(private service:ServiziService , private auth:AuthService) { }
// Pie
public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
public pieChartData:number[] = [40, 20, 20 , 10,10];
public pieChartType:string = 'pie';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
  ngOnInit(): void {
    console.log(this.service.services, 'grafici')
    console.log(this.service.serviziFiltered,' grafici 2')
;
    console.log(    this.counter('red'))
  }





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

}
