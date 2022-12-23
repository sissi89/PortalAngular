import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DetailDoc, Doc, Download } from 'src/app/model/doc';
import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';
import { TabsComponent } from '../tabs/tabs.component';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.scss']
})
export class DocumentiComponent implements OnInit {
  service: Service | undefined;
  documentForm: FormGroup;
  documents: Doc[] = [];
  myFiles: DetailDoc[] = [];
  url: any;
  isCompleted: boolean = true;



  download$: Observable<Download> | undefined
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<TabsComponent>, public toast: ToastService, public http: HttpClient,
    public serviziService: ServiziService, @Inject(DOCUMENT) private document: Document) {
    this.documentForm = this.fb.group({
      document1: new FormControl(null, Validators.required),
      fileSource: new FormControl('', [Validators.required])

    })
  }



  ngOnInit(): void {
    // this.getId()
    this.loadDocuments();
    // console.log(this.service,'ssssss')
  }

 


  // invia form
  onSubmit(): void {
    let camps = this.documentForm.value
    if (camps.document1) {
      //codice per la post 
      /*this.serviziService.post( camps)
     .subscribe(res => {
       console.log(res);
       this.toast.snackBar('File inviati','bg-success')
     }) */
      this.dialogRef.close();
      this.toast.snackBar(`File ${camps.document1}`, 'bg-success')

    } else {


      this.toast.snackBar('Compilare tutti i campi', 'bg-danger')
    }
  }
  // get documents
  loadDocuments() {
    let id = localStorage.getItem('id');

    id && this.serviziService.getDocumentsInc(id).subscribe((data) => {
      console.log(data);
      this.documents = data;
      console.log(this.documents, 'myfiles')
    })

  }
  // monitorare più file
  onFileChange(event: any) {
let f = event.value;
console.log(f);
   

    for (let i = 0; i < event.target.files.length; i++) {
      // console.log('richiamo funzione')
      this.myFiles.push(event.target.files[i]);
      this.documentForm.patchValue({
        fileSource: this.myFiles

      });

    }




  }
  // delete file caricato

  deleteFile(file: DetailDoc) {
    return this.myFiles.map((f: DetailDoc, index: number) => {
      f == file && this.myFiles.splice(index, 1)
      //  this.toast.snackBar(`Rimosso il file ${f.name}`,'bg-success')
    })



  }

  // dowload file

  download(name: string, id: string) {
    this.isCompleted = false;
    this.toast.snackBar('il file sara scaricato a breve', 'bg-success');
    id && this.serviziService.downSingleDocument(id).subscribe((data) => {
      this.url = data;
      console.log('bbbbbb', data);
    });
    if (this.url != null) {
      console.log('dentro l if ')
      setTimeout(() => {

        var blob = new Blob([this.url], { type: 'application/pdf' });
        var file = new File([blob], name, { type: 'application/pdf' });

        saveAs(file)
        this.isCompleted = true;
        console.log('else è completo?', this.isCompleted)
      }, 2000);
    } else {
      console.log('dentro l else', this.isCompleted)
      setTimeout(() => {
        this.toast.snackBar('il file sara scaricato a breve', 'bg-success');
        var blob = new Blob([this.url], { type: 'application/pdf' });
        var file = new File([blob], name, { type: 'application/pdf' });

        saveAs(file)
        this.isCompleted = true;

        console.log('else è completo?', this.isCompleted)
      }, 3000);
    }

  }






  /* isCompleted(id:string){

  } */






}


