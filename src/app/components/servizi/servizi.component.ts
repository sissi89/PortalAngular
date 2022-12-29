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
  fiduciario: string = 'tutti';
  user: User | null = this.authService.userValue;
  fiduciari: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [this.tableSize, 2, 10, 50];
  red: number = 0;
  numSx: string = '';
  // oggi 
  today = moment(new Date()).format('YYYY-MM-DD');
  // oggi - 30 giorni 
  start = moment(Date.now() - 5 * 24 * 3600 * 1000).format('YYYY-MM-DD');
  dateForm: FormGroup;
  colors: Tipologia[] = [
    {
      color: 'red',
      tipo: 'Urgenze',
      num: 1
    },
    {
      color: 'yellow',
      tipo: ' Aperti',
      num: 2
    },
    {
      color: 'green',
      tipo: ' Chiusi',
      num: 3
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
    //Produzione = "http://webapp.sogesa.net/portale/jarvis.php?do=incarichi&numsx="
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
      console.log(data)
      this.service.serviziFilterered.forEach((item) => {

        Object.assign(item, { tipo: this.service.randomIntFromInterval(1, 3) })
      })

      this.service.fiduciari = data.reduce((arr: any, item: any) => {


        !arr.includes(item.nomePer) && arr.push(item.nomePer)


        return arr;
      }, []);
      //   
    })
    this.setDate()
    this.isClick = true;

  }


  setDate() {
    localStorage.setItem('end', this.today)
    localStorage.setItem('start', this.start)
  }

  getEnd() {
    return localStorage.getItem('end')
  }

  getStart() {

    return localStorage.getItem('start')
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


  changeSizePage(event: any) {
    console.log(event.target.value)
    this.page = 1;
    return this.tableSize = event.target.value;
  }
  // contatore filter
  /* counter(color: number): number {
    // inizializzo il contatore
    let i = 0;


    this.service.serviziFilterered.filter((e: ServiceReal) => {
      // per ogni elemento che sodisfa la condizione aggiungo 1 al contatore
      e.tipo === color ? (i += 1) : i;
    });
    //  console.log(i)
    return i;
  } */
  counter(color: number) {
    return this.counterIncarichi(color, this.service.serviziFilterered);
  }
  // contatori services
  counterServices(color: number): number  {

    if (this.counter(color) === 0) {
    
      return   this.counterIncarichi(color,this.service.services);
    } else {
      return this.counter(color)
    }

  }
  counterIncarichi(color: number, incarichi: ServiceReal[]) {
    let i = 0;
    incarichi.filter((e: ServiceReal) => {
      e.tipo === color ? (i += 1) : i;
    })
    return i;
  }

  // modal general
  openDialog(id: string, fiduciario: string) {
    this.dialog.open(TabsComponent);

    localStorage.setItem('id', id);
    // cosi sposto dal padre al figlio il nome del perito
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


  getType(number: any): string {
    switch (number) {
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      default:
        return 'NaN';

    }
  }


  // numero sinistro fatta anche con una pipe
  getNumberleft(number: any): string {

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
  // tutti gli incarichi
  all() {
    // richiamo tutti i servizi
    console.log(this.service.services, 'alll');
    // resetto la variabile a stringa 
    this.selectedFiduciario = '';
    this.fiduciario ='tutti';
    this.numSx ='';
    // cosi evito un altra chiamata al server
    return (this.service.serviziFilterered = this.service.services);
  }
  /*----- filtri ----- */
  // filtro per i contatori
  serviceFilter(tipo: number) {
    let filteres:ServiceReal[] =[];
   /*  this.service.serviziFilterered = this.service.serviziFilterered.reduce((filteres: ServiceReal[], service: ServiceReal) => {
      service.tipo === tipo && filteres.push(service);
      return filteres;
    }, []) */
    this.service.serviziFilterered.filter((item:ServiceReal)=>{
      item.tipo === tipo && filteres.push(item)
    })
    if(filteres.length > 0){
      this.page = 1;
      return this.service.serviziFilterered = filteres;
    }else{
    
      this.page = 1;
      return this.service.serviziFilterered = this.service.services;
    }

  }

  // filtro per fiduciari 
  trusteeFilter(truste: string) {
    // console.log(truste, 'truste')
    this.selectedFiduciario.toUpperCase();
    console.log(this.selectedFiduciario);
    this.fiduciario = this.selectedFiduciario;
    if (this.user && this.user.role === 1) {
      if (this.selectedFiduciario === 'Tutti i fiduciari') {
        return this.all();
      }
      // se è falsy 
      if (!truste) {
        return this.all();
      } else {
        // let string =  this.transform2(truste);
        //   console.log(string, 'stringa trasformata');

        let arr: ServiceReal[] = [];
        this.service.serviziFilterered.filter((item: ServiceReal) => {
          item.nomePer === truste && arr.push(item);
        })

        // resetto la paginazzione
        this.page = 1;
        this.selectedFiduciario = '';
        if(arr.length > 0){
          return this.service.serviziFilterered = arr;
        }else{
          this.all();
          this._toast.snackBar(`Riprova per  ${truste}`,'bg-danger')
          return this.all();
        }
       
      }

    }
    else {
      this._toast.snackBar("Ruolo Fiduciario", "bg-danger")
      return null;
    }
  }

  // filtro per nr sinistro 

  numberSxFilter(numSx: string) {
    let arr: ServiceReal[] = []
    this.service.serviziFilterered = this.service.services.filter((item: ServiceReal) => {
      console.log(item.numSx === numSx, numSx);
      item.numSx === numSx && arr.push(item)

    })
    this.service.serviziFilterered = arr;
    // resetto la paginazzione
    this.page = 1;
    if (this.service.serviziFilterered.length > 0) {
      return this.service.serviziFilterered;
    } else {
      this._toast.snackBar(`non ci sono sinistri per ${numSx}`, 'bg-danger');
      return this.all();
    }


  }

  /*  this.service.serviziFilterered = this.service.services.reduce((filteres: ServiceReal[], service: ServiceReal) => {
     service.tipo === tipo && filteres.push(service);
     return filteres;
   }, []) */




// call quando ci srà il filtro back end fiduciario
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
