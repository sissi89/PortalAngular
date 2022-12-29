import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { ServiziComponent } from '../servizi/servizi.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiziService } from 'src/app/services/servizi.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  dateForm:FormGroup;
  today=moment(new Date()).format("YYYY-MM-DD");
  constructor( private fb: FormBuilder, private toast:ToastService,public dialogRef: MatDialogRef<ServiziComponent>, public service:ServiziService) { 
    this.dateForm = this.fb.group({
    start:[this.today,Validators.required],
    end:[this.today,Validators.required]
    }
      

    )
     
    
  }

  ngOnInit(): void {
   
  
  }

  onSumbit(){
 
    const val = this.dateForm.value;
   localStorage.setItem('start',val.start);
   localStorage.setItem('end',val.end);
    
    // se sono validi i campi
    if(val.start && val.end){
       // resetto le variabili 
     
      // se la data di inizio non è superiore di quella di fine e se entrambi non sono superiori alla data odierna 
      if(val.start <= val.end && val.end <= this.today && val.start <= this.today){
        this.service.services = [];
        this.service.serviziFilterered = [];
        this.service.getServiceIncarichiWithDate(val.start,val.end).subscribe((data)=>{
          this.service.services = data;
          this.service.serviziFilterered = data;
          this.service.services.forEach((item) => {

            Object.assign(item, { tipo: this.service.randomIntFromInterval(1, 3) })
          })
    
          this.service.fiduciari = data.reduce((arr: any, item: any) => {
 
       
         !arr.includes(item.nomePer) && arr.push(item.nomePer)
             
    
            return arr;
          }, []);
      //    
        })
        this.dialogRef.close();
   
      }else{
        this.toast.snackBar('date fuori range','bg-danger');
      }
     

    }else{
      this.toast.snackBar('compilare tutti i campi','bg-danger');
    }
   
    
  }
      
     


  }


