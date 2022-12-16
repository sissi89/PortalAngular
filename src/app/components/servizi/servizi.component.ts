import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { User } from 'src/app/model/auth';

import { Service } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';
import { FilterComponent } from '../filter/filter.component';

import { TabsComponent } from '../tabs/tabs.component';
import { TypeLeftComponent } from '../type-left/type-left.component';

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss'],
})
export class ServiziComponent implements OnInit {
  // services:Service[]=[];
  service2: Service[] = [];
  selectedItems: [] = [];
  selectedFiduciario: string = ' ';
  user:User | null = this.authService.userValue;
  fiduciari: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  red: number = 0;
  today = moment(new Date()).format('YYYY-MM-DD');
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
  ]; /*, {
    "color":"blue",
    "tipo":"Tutti gli incarichi"
  } ]*/

  constructor(
    public service: ServiziService,
    public dialog: MatDialog,
    public authService: AuthService,
    public _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.loadServizi2();
    // this.services
    this.getFiduciari();

    //console.log(this.service.serviziFiltered)
    console.log('provaaaaaaa', this.service.serviziFiltered);

    console.log('prova ngonit', this.service.serviziFiltered);
  }

  loadServizi2() {
    this.getRole();

   

    if (this.user && this.user.role === 2) {
      this.service.getAllServiceUsername(this.user.username).subscribe((data) => {
        console.log(data, 'dataaaaaa');
        this.service.services = data;
        this.service.serviziFiltered = data;

        console.log(this.service.serviziFiltered);
      });
    } else if (this.user && this.user.role === 1) {
      this.service.getServicesOperator().subscribe((data) => {
        this.service.services = data;
        console.log(data, 'dataaaaaa');
        // console.log('services:',this.services)
        this.service.serviziFiltered = data;
        //  console.log(data)
        console.log('primaaaaaaa', this.service.fiduciari);
        // array di fiduciari
        this.service.fiduciari = data.reduce((arr: any, item: any) => {
          console.log('1', item.fiduciario);
          arr.includes(item.fiduciario)
            ? console.log('non include')
            : arr.push(item.fiduciario);

          return arr;
        }, []);
      });
    }
  }
  onTableDataChange(event: number) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  // contatore
  counter(color: string): number {
    // inizializzo il contatore
    let i = 0;
    this.service.serviziFiltered.filter((e: Service) => {
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.sinisterState === color ? (i += 1) : i;
    });
    //  console.log(i)
    return i;
  }

  // modal general
  openDialog(id: string) {
    this.dialog.open(TabsComponent);

    localStorage.setItem('id', id);
  }
  // modal filtro data
  openDialogFilter() {
    this.dialog.open(FilterComponent);
  }
  openDialogFilterLeftType() {
    this.dialog.open(TypeLeftComponent);
  }
  // ruolo viariso250589!
  getRole() {
    // return Number(localStorage.getItem('role'));
    let user = this.authService.userValue;

    if (user?.role) {
      return Number(user.role);
    } else {
      return 0;
    }
  }



  // numero sinistro fatta anche con una pipe
  getNumberleft(number: any): string {
    if (number) {
      switch (number) {
        case 1:
          return (number = 'R.C.A');
        case 2:
          return (number = 'C.A.R.D');
        case 3:
          return (number = 'C.V.T');
        default:
          return 'nAn';
      }
    }

    return number;
  }

  // filtro per i contatori
  serviceFilter(tipo: string) {
    // this.service.serviziFiltered = this.service.services;
    this.service.serviziFiltered = this.service.serviziFiltered.reduce(
      (filters: Service[], service: Service) => {
        // se è uguale a quello che stiamo cercando allora l ho inseriamo nell array
        service.sinisterState === tipo && filters.push(service);

        return filters;
      },
      []
    );
  }

  // filtro per fiduciari 
  trusteeFilter(truste: string) {
   
    if (this.user && this.user.role === 1) {
      // se è falsy 
        if(!truste){
          return this.all();
        }else{
          this.service.serviziFiltered = this.service.services.reduce((arr: Service[], item: Service) => {
            this.transform(this.selectedFiduciario);
            console.log( )
           item.fiduciario=== truste ? arr.push(item) : console.log('non è uguale')
            return arr;
          }, [])
          this.transform(truste);
          return this.service.serviziFiltered;
        }
        }
     else {
      this._toast.snackBar("Ruolo Fiduciario", "bg-danger")
      return null;
    }
  }

  // tutti gli incarichi
  all() {
    // richiamo tutti i servizi
    console.log(this.service.services, 'alll');

    this.selectedFiduciario = '';
    // cosi evito un altra chiamata al server
    return (this.service.serviziFiltered = this.service.services);
  }


  // lista di fiduciari 
  getFiduciari(){
    let arr= this.service.serviziFiltered.filter((item, pos: any) => {
      // restituisce il primo valore uguale 
      this.service.serviziFiltered.indexOf(item) == pos;
    });
    // alla fine mappo un array di appoccio con  solo nomi dei fiduciari
    
   return (this.fiduciari = arr.map((item) => {
    this.transform(item.fiduciario)
    }));
   
    
  }
  transform(string: string): string {
    switch (string) {
      case "ROSSI":
        return string = '0001';

      case "BIANCHI":
        return string = '0002';

      default:
        return ' Non presente ';
    }
  }


}
