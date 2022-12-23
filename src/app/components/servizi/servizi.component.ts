import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { User } from 'src/app/model/auth';

import { Service, ServiceReal } from 'src/app/model/model';
import { Tipologia } from 'src/app/model/tipo';
import { FiduciarioPipe } from 'src/app/pipes/fiduciario.pipe';
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
  isClick: boolean = false;
  selectedItems: [] = [];
  selectedFiduciario: string = ' ';
  user: User | null = this.authService.userValue;
  fiduciari: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  red: number = 0;
  // oggi 
  today = moment(new Date()).format('YYYY-MM-DD');
  // oggi - 3 giorni 
  start = moment(Date.now() - 5 * 24 * 3600 * 1000).format('YYYY-MM-DD');
  dateForm: FormGroup;
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
  } ]
    dateForm:FormGroup;

  today=moment(new Date()).format("YYYY-MM-DD");
  constructor( private fb: FormBuilder, private toast:ToastService,public dialogRef: MatDialogRef<ServiziComponent>) { 
    this.dateForm = this.fb.group({
    start:[this.today,Validators.required],
    end:[this.today,Validators.required]
    }
      

    )
     
    
  }*/

  constructor(
    public service: ServiziService,
    public dialog: MatDialog,
    public authService: AuthService,
    public _toast: ToastService,
    private fb: FormBuilder

  ) {
    this.dateForm = this.fb.group({
      start: [this.today, Validators.required],
      end: [this.today, Validators.required]
    }


    )
  }

  ngOnInit(): void {

    this.loadSinistriWithDate()
  }

  isEquals(): boolean {
    return this.service.services === this.service.serviziFilterered
  }
  // sinistri in base al fiduciario
  loadSinistrIncarichiFiduciarii() {
    //Produzione = "https://webapp.sogesa.net/portale/jarvis.php?do=incarichi&numsx="
    this.service.getServiceIncarichiFiduciari("0044587201670335665").subscribe((data) => {
      console.log("data:", data)
      //  this.service.serviziFilterered = data;

    })


  }

  loadSinistriWithDate() {
    this.isClick = false;

  
    this.service.getServiceIncarichiWithDate(this.start, this.today).subscribe((data) => {
      this.service.services = data;
      this.service.serviziFilterered = data;
    
      this.service.fiduciari = data.reduce((arr: any, item: any) => {
      

        !arr.includes(item.nomePer) && arr.push(item.nomePer)


        return arr;
      }, []);
      //   
    })
    this.isClick = true;

  }





  /*  loadServizi() {
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
             //  ? console.log('non include')
             && arr.push(item.fiduciario);
 
           return arr;
         }, []);
       });
     }
   } */
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


    this.service.serviziFilterered.filter((e: ServiceReal) => {
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? (i += 1) : i;
    });
    //  console.log(i)
    return i;
  }

  // modal general
  openDialog(id: string, fiduciario: string) {
    this.dialog.open(TabsComponent);

    localStorage.setItem('id', id);
    localStorage.setItem('fiduciario', fiduciario)
  }
  // modal filtro data
  openDialogFilter() {
    this.dialog.open(FilterComponent);
  }
  openDialogFilterLeftType() {
    this.dialog.open(TypeLeftComponent, {
      autoFocus: false,
      maxHeight: '50vh'

    });
  }
  // ruolo
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

    this.service.serviziFilterered = this.service.services.reduce((filteres: ServiceReal[], service: ServiceReal) => {
      service.tipo === tipo && filteres.push(service);
      return filteres;
    }, [])
  }

  // filtro per fiduciari 
  trusteeFilter(truste: string) {
    console.log(truste, 'truste')
    this.selectedFiduciario.toUpperCase();
    console.log(this.selectedFiduciario);
    if (this.user && this.user.role === 1) {
      // se è falsy 
      if (!truste) {
        return this.all();
      } else {
        // let string =  this.transform2(truste);
        //   console.log(string, 'stringa trasformata');
        this.service.serviziFilterered = this.service.services.reduce((arr: ServiceReal[], item: ServiceReal) => {


          item.nomePer === truste ? arr.push(item) : console.log('non è uguale')
          return arr;
        }, [])

        return this.service.serviziFilterered;
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
    // resetto la variabile a stringa 
    this.selectedFiduciario = '';
    // cosi evito un altra chiamata al server
    return (this.service.serviziFilterered = this.service.services);
  }


  // lista di fiduciari 
  getFiduciari() {
    let arr = this.service.serviziFilterered.filter((item, pos: any) => {
      // restituisce il primo valore uguale 
      this.service.serviziFilterered.indexOf(item) == pos;
    });
    // alla fine mappo un array di appoccio con  solo nomi dei fiduciari

    return (this.fiduciari = arr.map((item) => {
      item.nomePer
    }));


  }

  /* trusteFilterBackEnd(truste: string) {
    if (this.user && truste) {
      this.service.getAllServiceUsername(truste).subscribe((data) => {
        console.log(data, 'dataaaaaa');

        this.service.serviziFiltered = data;

        console.log(this.service.serviziFiltered);
      });
      this._toast.snackBar(`filtro per fiduciario : ${truste}`, 'bg-success');
      return this.service.serviziFiltered;

    } else {
      this._toast.snackBar(`nessun filtro inserito`, "bg-danger");
      return this.service.serviziFiltered = this.service.services;
    }

  } */




}
