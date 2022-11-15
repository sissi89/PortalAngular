import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from 'express';
import { ToastService } from 'src/app/services/toast.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-comunicazione',
  templateUrl: './comunicazione.component.html',
  styleUrls: ['./comunicazione.component.scss']
})
export class ComunicazioneComponent implements OnInit {
  options:string[]=['Comunicazione a mandante','Comunicazione da compagnia','Comunicazione interna','Da network',
  'Interlocutoria a mandante','Sollecito incarico','Sollecito riserva'];
  comunicationForm:FormGroup;
 constructor( public fb:FormBuilder, private toast:ToastService,public dialogRef: MatDialogRef<TabsComponent>){
  this.comunicationForm = this.fb.group({
    option: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    text_area: new FormControl('',[Validators.required]),
    upload_file: new FormControl(null,[Validators.required])
  });
 }

  

  ngOnInit(): void {

  }

  onSubmit(){
    console.log('is valid',this.comunicationForm.value)
    let camps = this.comunicationForm.value
    if(camps.option && camps.text_area && camps.upload_file){
      // inserire qui il codice dove fare la post 
      console.log(this.comunicationForm.value,'bbbbbb')
      
      this.dialogRef.close(); //<- chiude la modal del altro componente
    }else{
  //this.toast.snackBar('Compilare tutti i campi','bg-danger')
  alert('compilare tutti i campi')
      
    }

  }

}
