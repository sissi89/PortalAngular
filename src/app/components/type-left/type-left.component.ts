
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/model';
import { ServiziService } from 'src/app/services/servizi.service';
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
  typesLeft: any[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    value: i + 1,
    isSelected: false,
  }));


  // checklist
  masterSelected: boolean = false;
  checkedList: TypoLeft[] = [];

  constructor(
    public service: ServiziService,
    public dialogRef: MatDialogRef<ServiziComponent>,
    private toast: ToastService
  ) {

    this.typesLeft;
  }
  ngOnInit(): void {
  
  }

  // Check All Checkbox Checked
  isAllSelected() {
    // metodo verifica se tutti gli elementi nell'array superano il test
    this.masterSelected = this.typesLeft.every(({isSelected}: TypoLeft) => {
      return isSelected == true;
    });
    this.getCheckedItemList();
  }
  // get lista di quelli che checcati
  getCheckedItemList() {
    this.checkedList = [];
    // filtro per tipo 
    this.typesLeft.filter((item: TypoLeft) => {
      item.isSelected && this.checkedList.push(item);
    });
    // this.checkedList = JSON.stringify(this.checkedList);
    return this.checkedList;
  }

  toStringArr() {
    // modifico l array in modo che l utente riesce a leggerla
    let arrNew = this.checkedList.map(i => this.service.getNumberleft(i.value.toString()));
    this.toast.snackBar(` Filtro per ${arrNew}`, 'bg-success');
    this.dialogRef.close();
    return arrNew;
  }
  /* filterTypeLeft() {
  //  this.service.serviziFiltered = this.service.services;
 
    // se il filtro è solo per un tipo di sinistro 
    if (this.checkedList.length === 1) {
      let type1 = this.checkedList[0].value;
      this.service.serviziFilterered = this.service.serviziFilterered.reduce(
        (arr: Service[], item: Service) => {
          if (type1 === Number(item.tipo_sinistro)) {
            arr.push(item);
          }

          return arr;
        }, []);
      

// rendo accessibile l array all utente in modo tale che riesce a leggerla nel toast
      this.toStringArr();


      // se il filtro ha più di un tipo si sinistro 
    } else if (this.checkedList.length === 2) {

      // tipi sinistri salvati dentro l arr
      let type1 = this.checkedList[0].value;
      let type2 = this.checkedList[1].value;

      this.service.serviziFiltered = this.service.serviziFiltered.reduce(
        (arr: Service[], item: Service) => {
          // console.log('aaaaa',item.tipo_sinistro)
          if (type1 === Number(item.tipo_sinistro) || type2 === Number(item.tipo_sinistro)) {
            //   che stiamo cercando allora l ho inseriamo nell array
            arr.push(item);
          }
          return arr;
        },
        []
      );

      if(this.service.serviziFiltered.length >0){
        this.toStringArr();
      }else{
        this.toast.snackBar(`Non ci sono sinistri per ${this.service.getNumberleft(type1.toString())}  e ${this.service.getNumberleft(type2.toString())}`,'bg-danger')
        this.dialogRef.close();
      }



      // controllo se ci sono più filtri
    } else if (this.checkedList.length === 3) {
      let type1 = this.checkedList[0].value;
      let type2 = this.checkedList[1].value;
      let type3 = this.checkedList[2].value;
      this.service.serviziFiltered = this.service.serviziFiltered.reduce(
        (arr: Service[], item: Service) => {
          // console.log('aaaaa',item.tipo_sinistro)
          if (type1 === Number(item.tipo_sinistro) || type2 === Number(item.tipo_sinistro) || type3 === Number(item.tipo_sinistro)) {
            //   che stiamo cercando allora l ho inseriamo nell array
            arr.push(item);
          }
          return arr;
        },
        []
      );

      this.toStringArr();

    } else if (this.checkedList.length > 3) {
      // avviso l utente che sta cercando per  troppi filtri
      this.toast.snackBar('Massimo 2 filtri per volta', 'bg-danger');
    } else {
      // avviso 0 filtri
      this.toast.snackBar('Nessun filtro inserito', 'bg-danger');
    }
  } */
}


