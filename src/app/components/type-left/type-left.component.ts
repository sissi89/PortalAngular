import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service } from 'src/app/model/model';
import { TypesLeftPipe } from 'src/app/pipes/types-left.pipe';
import { ServiziService } from 'src/app/services/servizi.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiziComponent } from '../servizi/servizi.component';
import { ToastService } from 'src/app/services/toast.service';
interface TypoLeft {
  id: number;
  value: number;
  isSelected: boolean;
}
@Component({
  selector: 'app-type-left',
  templateUrl: './type-left.component.html',
  styleUrls: ['./type-left.component.scss'],
})
export class TypeLeftComponent implements OnInit {
  // tipi di sinistri
  typesLeft: any[] = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    value: i + 1,
    isSelected: false,
  })); 
  // checklist
  masterSelected: boolean = false;
  checkedList: TypoLeft[] = [];

  constructor(
    public service: ServiziService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ServiziComponent>,
    private toast: ToastService
  ) {
  
    this.typesLeft;
  }
  ngOnInit(): void {
    console.log(this.typesLeft);
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    this.typesLeft.map((item:TypoLeft) => {
      item.isSelected = this.masterSelected;
    });
    this.getCheckedItemList();
  }
  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.typesLeft.every((item:TypoLeft) => {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }
  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];

    this.typesLeft.filter((item:TypoLeft) => {
      item.isSelected && this.checkedList.push(item);
    });
    // this.checkedList = JSON.stringify(this.checkedList);
  }
  filterTypeLeft() {
    // console.log(this.checkedList[0].value)
    //console.log('services:',this.service.serviziFiltered)
    console.log('number', this.checkedList.length);
    // se il filtro è solo per un tipo di sinistro 
    if (this.checkedList.length === 1) {
      let type1 = this.checkedList[0].value;
      this.service.serviziFiltered = this.service.serviziFiltered.reduce(
        (arr: Service[], item: Service) => {
          if (type1 === Number(item.tipo_sinistro)) {
            arr.push(item);
          }

          return arr;
        },[]);
        
        this.toast.snackBar(` Filtro per ${this.service.getNumberleft(Number(type1))}`, 'bg-success');
      this.dialogRef.close();
      console.log(this.service.serviziFiltered);
      // se il filtro è per più di tipi di sinistri
    } else if (this.checkedList.length === 2) {
    
      // tipi sinistri salvati dentro l arr
      let type1 = this.checkedList[0].value;
      let type2 = this.checkedList[1].value;
   
      this.service.serviziFiltered = this.service.serviziFiltered.reduce(
        (arr: Service[], item: Service) => {
         // console.log('aaaaa',item.tipo_sinistro)
          if (type1 === Number(item.tipo_sinistro) || type2 === Number(item.tipo_sinistro)) {
            // se è uguale a quello che stiamo cercando allora l ho inseriamo nell array
            arr.push(item);
          }
          return arr;
        },
        []
      );
   
      // modifico l array in modo che l utente riesce a leggerla
     let arrNew =  this.checkedList.map(i => this.service.getNumberleft(Number(i.value)) )
     
        // result 
      this.toast.snackBar(`ok! ${arrNew.toString()}`, 'bg-success');
      this.dialogRef.close();
    //  console.log(this.service.serviziFiltered);
    // controllo se ci sono più filtri 
    }else if(this.checkedList.length > 2){
      // avviso l utente che sta cercando per  troppi filtri
      this.toast.snackBar('Massimo 2 filtri per volta', 'bg-danger');
    } else {
      // avviso 0 filtri
      this.toast.snackBar('nessun filtro inserito', 'bg-danger');
    }
  }
}
