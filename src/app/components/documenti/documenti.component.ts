import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Doc, Download } from 'src/app/model/doc';
import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';
import { TabsComponent } from '../tabs/tabs.component';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.scss']
})
export class DocumentiComponent implements OnInit {
  service: Service | undefined;
  documentForm : FormGroup;
  myFiles:Doc [] = [];

  
  download$: Observable<Download> | undefined
  constructor(public fb:FormBuilder, public dialogRef: MatDialogRef<TabsComponent>, public toast: ToastService, 
    public serviziService:ServiziService,  @Inject(DOCUMENT) private document: Document) { 
    this.documentForm = this.fb.group({
      document1: new FormControl(null,Validators.required),
      fileSource: new FormControl('', [Validators.required])
  
    })
  }

  

  ngOnInit(): void {
  this.getId()
  
   // console.log(this.service,'ssssss')
  }
 
  // id service
  getId(){
  //  console.log(localStorage.getItem('id'))
    let id = localStorage.getItem('id');
    if(id !=null){
      return this.getService(id)
    }
   
  
  }
  // servizio
  getService(id:string){
/*     this.serviziService.getServiceById(id).subscribe(data=>{
    // console.log('sono richiamata',data)
     this.service = data;
    //('qqqq',this.service)
    }) */
    

  }
  // invia form
  onSubmit(): void{
    let camps = this.documentForm.value
    if(camps.document1 ){
      //codice per la post 
      /*this.serviziService.post( camps)
     .subscribe(res => {
       console.log(res);
       this.toast.snackBar('File inviati','bg-success')
     }) */
      this.dialogRef.close();
     this.toast.snackBar(`File ${camps.document1}`,'bg-success')
    
    }else{
   
    
     this.toast.snackBar('Compilare tutti i campi','bg-danger')
    }
  }
  // monitorare più file
  onFileChange(event:any) {

     /*   return  event.target.files.map((item:Doc) =>{
      this.myFiles.push(item)
      this.documentForm.patchValue({
        fileSource: this.myFiles
      });
    }) */
   
    for (let i = 0; i < event.target.files.length; i++) { 
     // console.log('richiamo funzione')
        this.myFiles.push(event.target.files[i]);
        this.documentForm.patchValue({
          fileSource: this.myFiles

        });
        
    }   

 
 
    
}
// delete file caricato

deleteFile(file:Doc){
 return  this.myFiles.map((f:Doc,index:number)=>{
    f == file && this.myFiles.splice(index,1)
    this.toast.snackBar(`Rimosso il file ${f.name}`,'bg-success')
  })
 
  

}

  // dowload file

  download(url:string, name:string){
    var blob = new Blob([url],{type:'application/pdf'});
    var file = new File([blob],name,{type:'application/pdf'});
    saveAs(file)
  }






/*  get f(){
   return this.myForm.controls;
 }
    

     
 submit(){
   const formData = new FormData();

   for (var i = 0; i < this.myFiles.length; i++) {
     formData.append("file[]", this.myFiles[i]);
   }
 
   this.http.post('http://localhost:8001/upload.php', formData)
     .subscribe(res => {
       console.log(res);
       alert('Uploaded Successfully.');
     })
 } */


 /*  get f(){
    return this.myForm.controls;
  }
     
 
      
  submit(){
    const formData = new FormData();
 
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("file[]", this.myFiles[i]);
    }
  
    this.http.post('http://localhost:8001/upload.php', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  } */

}
