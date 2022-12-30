import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { ServiziComponent } from '../servizi/servizi.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/services/servizi.service';
import { ServiceReal } from 'src/app/model/model';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dateForm: FormGroup;
  today = moment(new Date()).format("YYYY-MM-DD");
  constructor(private fb: FormBuilder, private toast: ToastService, public dialogRef: MatDialogRef<ServiziComponent>, public service: ServiziService) {
    this.dateForm = this.fb.group({
      start: [this.today, Validators.required],
      end: [this.today, Validators.required]
    })

  }

  ngOnInit(): void {

    console.log(this.dateForm.value)
  }

  loadIncarichi(start: string, end: string) {
    // svuoto i vecchi incarichi
    this.service.services = [];
    this.service.serviziFilterered = [];
    this.service.fiduciari = [];
    // faccio la chiamata al server
    this.service.getServiceIncarichiWithDate(start, end).subscribe((data) => {
      this.service.services = data;
      this.service.serviziFilterered = data;
      this.service.services.forEach((item) => {
        // aggiungo il tipo all oggetto
        Object.assign(item, { tipo: this.service.randomIntFromInterval(1, 3) })
      })

      // in base alla data mi prendo i nomi dei fiduciari
      this.service.fiduciari = data.reduce((arr: string[], item: ServiceReal) => {

        // se non è presente il nome del perito l ho inserisci
        !arr.includes(item.nomePer) && arr.push(item.nomePer)


        return arr;
      }, []);
      //    
    })
    // chiudo la modal
    this.dialogRef.close();
  }

  onSumbit() {

    const val = this.dateForm.value;
    // aggiorno le date
    localStorage.setItem('start', val.start);
    localStorage.setItem('end', val.end);

    // se sono validi i campi
    if (val.start && val.end) {

      // se la data di inizio non è superiore di quella di fine e se entrambi non sono superiori alla data odierna 
      if (val.start <= val.end && val.end <= this.today && val.start <= this.today) {

        return this.loadIncarichi(val.start, val.end)
        // la data inizio è superiore a quella di fine 
      } else if (val.start > val.end) {
        this.toast.snackBar('data inizio superiore a data fine', 'bg-danger');
        return null;
        //entrambi  sono superiori alla data odierna 
      } else if (val.end > this.today || val.start > this.today) {
        this.toast.snackBar('Non puo cercare una data nel futuro', 'bg-danger');
        return null;
      }


    } else {

      this.toast.snackBar('compilare tutti i campi', 'bg-danger');
      return null;
    }


  }




}


