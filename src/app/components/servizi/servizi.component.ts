import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { User } from 'src/app/model/auth';

import { ServiceReal } from 'src/app/model/model';
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



  selectedFiduciario: string = ' ';

  fiduciario: string = 'tutti';
  user: User | null = this.authService.userValue;

  // page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  numSx: string = '';
  idIncarico: string = '';
  //isFilter:boolean = false;
  // oggi 
  today = moment(new Date()).format('YYYY-MM-DD');
  // oggi - 30 giorni 
  start = moment(Date.now() - 5 * 24 * 3600 * 1000).format('YYYY-MM-DD');
  dateForm: FormGroup;
  c: number = 0;
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
  ];

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
    // this.isFilter = true;
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

    this.service.services = [];
    this.service.serviziFilterered = [];
    // sistemare il filtro

    this.service.getServiceIncarichiWithDate(this.start, this.today).subscribe((data) => {
      this.service.services = data;
      this.service.serviziFilterered = data;
      console.log(data)
      // aggiungo il tipo incarico
      this.service.serviziFilterered.forEach((item) => {

        Object.assign(item, { tipo: this.service.randomIntFromInterval(1, 3) })
      })

      this.service.fiduciari = data.reduce((arr: any, item: any) => {


        !arr.includes(item.nomePer) && arr.push(item.nomePer)


        return arr;
      }, []);
      //   
    })
    this.setLocalStorage()

  }

  // create arrry of  tableSizes

  createArray(length: number) {
    // creo un array di un lunghezza variabile e ogni valore l ho multiplo x 10
    let array = Array.from({ length: length }, (_, i) => (
      i * 10

    ))
    array.shift()
    return array;
  }


  setLocalStorage() {
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
    this.service.page = event;
  }


  changeSizePage(event: any) {
    console.log(event.target.value)
    this.service.page = 1;
    return this.tableSize = event.target.value;
  }
  // contatori incarichi 
  counter(color: number) {
    return this.counterIncarichi(color, this.service.serviziFilterered);
  }

  counterServices(color: number): number {

    if (this.counter(color) === 0) {

      return this.counterIncarichi(color, this.service.services);
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
    this.isEquals()
    console.log(this.isEquals())
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

    return (this.service.fiduciari = arr.map((item) => {
      item.nomePer
    }));


  }
  // tutti gli incarichi da problemi insieme al filtro fiduciario
  all() {

    // richiamo tutti i servizi
    this.service.page = 1;
    console.log(this.service.isFilter, 'is filter')
    console.log(this.service.services, 'alll');
    // resetto le variabili
    this.selectedFiduciario = '';
    this.fiduciario = '';
    this.numSx = '';
    this.idIncarico = '';
    this.c = 0;

    // richiamo i service salvati in precendenza
    if (this.service.isFilter) {
      console.log('if')
      this.service.isFilter = false;
      return this.loadSinistriWithDate()
    } else {
      console.log('else')
      return (this.service.serviziFilterered = this.service.services);
    }
    // return  this.service.serviziFilterered = this.service.services;

  }
  /*----- filtri ----- */
  // filtro per i contatori
  serviceFilter(tipo: number) {
    let filteres: ServiceReal[] = [];

    this.service.serviziFilterered.filter((item: ServiceReal) => {
      item.tipo === tipo && filteres.push(item)
    })
    this.service.page = 1;
    if (filteres.length > 0) {

      return this.service.serviziFilterered = filteres;
    } else {


      return this.service.serviziFilterered = this.service.services;
    }

  }
  // button disabled 
  isDisalbled() {

    /*   if(!this.service.isFilter && !this.isEquals()){
      // questo non fa vedere
        return false;
      }else if(this.isEquals() && !this.service.isFilter){
      return true;
      }else if(this.isEquals() && this.service.isFilter){
        console.log('nel vero')
        return false;
      }else{
        return false;
      } */
    /* if(this.isEquals() && !this.service.isFilter){
      console.log('prova vero',(this.isEquals() && !this.service.isFilter) )
      return true
    }else{
      console.log('prova else',(this.isEquals() && !this.service.isFilter) )
      return false
    } */
    return this.isEquals() && !this.service.isFilter
  }

  // filtro per fiduciari 
  /*  trusteeFilter(truste: string) {
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
 
         // aggiungo al contatore dei filtri 
         this.count += 1;
         // resetto la paginazione
         this.service.page = 1;
         this.selectedFiduciario = '';
         if (arr.length > 0 && this.count === 0) {
           return this.service.serviziFilterered = arr;
         } else {
         //  this.all();
 
           let arr: ServiceReal[] = [];
           this.service.services.filter((item: ServiceReal) => {
             item.nomePer === truste && arr.push(item)
           })
           // this._toast.snackBar(`Riprova per  ${truste}`,'bg-danger')
 
           return this.service.serviziFilterered = arr;
         }
 
       }
 
     }
     else {
       this._toast.snackBar("Ruolo Fiduciario", "bg-danger")
       return null;
     }
   } */
  // filtro per fiduciari 
  trusteeFilter(truste: string) {
    console.log(truste, 'truste')
    this.fiduciario = truste;
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
        if (this.service.serviziFilterered.length > 0) {
          // resetto la paginazione
          this.service.page = 1;
          this.selectedFiduciario = '';
          // mando a schermo gli incarichi filtrati
          return this.service.serviziFilterered;

        } else {
          // mando a schermo tutti gli incarichi

          this._toast.snackBar(`Non ci sono incarichi per ${truste}`, 'bg-danger');
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
    this.service.serviziFilterered = this.service.services;
    this.service.serviziFilterered = this.service.services.filter((item: ServiceReal) => {
      // console.log(item.numSx === numSx, numSx);
      item.numSx === numSx && arr.push(item)

    })
    this.service.serviziFilterered = arr;
    // resetto la paginazzione
    this.service.page = 1;
    if (this.service.serviziFilterered.length > 0) {
      return this.service.serviziFilterered;
    } else {
      this._toast.snackBar(`non ci sono sinistri per ${numSx}`, 'bg-danger');
      return  this.service.serviziFilterered = this.service.services;
    }


  }
  numberIncarico(idIncarico: string) {
    let arr: ServiceReal[] = [];
    this.service.serviziFilterered = this.service.services;
    this.service.serviziFilterered = this.service.services.filter((item: ServiceReal) => {
      item.idInc === idIncarico && arr.push(item)
    })
    this.service.serviziFilterered = arr;
    this.service.page = 1;
    if (this.service.serviziFilterered.length > 0) {
      return this.service.serviziFilterered;
    } else {
      this._toast.snackBar(`non ci sono sinistri per ${idIncarico}`, 'bg-danger','right');
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
