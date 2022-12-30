import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DetailDoc, Doc, Download } from 'src/app/model/doc';
//import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';
import { TabsComponent } from '../tabs/tabs.component';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarDismiss } from '@angular/material/snack-bar';
@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.scss']
})
export class DocumentiComponent implements OnInit {
  //service: Service | undefined;
  documentForm: FormGroup;
  documents: Doc[] = [];
  myFiles: DetailDoc[] = [];
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
      this.documents.forEach((item) => {
        //  Object.assign(a,{quantity:1,total:a.price});
        Object.assign(item, { isFinisched: false })
      })

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
  download2(name: string, id: string) {
    this.isCompleted = false;
    this.toast.snackBar('il file sara scaricato a breve', 'bg-success');

    id && this.serviziService.downSingleDocument(id).subscribe((data) => {


      console.log('bbbbbb', data);
      // converto da binario a file 
      var blob = new Blob([data], { type: 'application/pdf' });
      // creo file come primo parametro metto il file e come secondo parametro il nome 
      var file = new File([blob], name, { type: 'application/pdf' });
      // salvo il file tramite libreria

      saveAs(file)
      this.isCompleted = true;

    });


  }











}


