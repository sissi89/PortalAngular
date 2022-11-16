import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.scss']
})
export class DocumentiComponent implements OnInit {
  documentForm : FormGroup;
  constructor(public fb:FormBuilder, public dialogRef: MatDialogRef<TabsComponent>, public toast: ToastService) { 
    this.documentForm = this.fb.group({
      document1: new FormControl(null,Validators.required),
      document2: new FormControl(null,Validators.required)
    })
  }

  ngOnInit(): void {
  }
 
  onSubmit(): void{
    let camps = this.documentForm.value
    if(camps.document1 && camps.documeent2){
      // inserire qui il codice dove far fare la post
      this.dialogRef.close();

    }else{
     // alert('compilare tutti i campi')
     this.toast.snackBar('Compilare tutti i campi','bg-danger')
    }
  }

}
