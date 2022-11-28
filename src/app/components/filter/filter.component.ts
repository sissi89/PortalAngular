import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { ServiziComponent } from '../servizi/servizi.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dateForm:FormGroup;
  today=moment(new Date()).format("YYYY-MM-DD");
  constructor( private fb: FormBuilder, private toast:ToastService,public dialogRef: MatDialogRef<ServiziComponent>) { 
    this.dateForm = this.fb.group({
    start:[this.today,Validators.required],
    end:[this.today,Validators.required]
    }
      

    )
     
    
  }

  ngOnInit(): void {
    let dateTime = moment(new Date()).format("YYYY-MM-DD")
    console.log('datetime', dateTime)
  }

  onSumbit(){
    const val = this.dateForm.value;
   
    // se sono truty i primi 2 valori
    (val.start && val.end) ?
    // data incarico non può essere nel futuro  e data end non può essere minore di data inizio

      (val.end <= this.today) && (val.start <= this.today) && ( val.end >= val.start)?
       // scrivere qui il codice per la chiamata al service
       //<- chiude la modal del altro componente this.dialogRef.close(); //<- chiude la modal del altro componente
      
        this.toast.snackBar(`ok!`,'bg-success') :

        
        this.toast.snackBar('Data fuori range','bg-danger'):
      this.toast.snackBar('compilare tutti i campi', 'bg-danger')
      
     


  }

}
