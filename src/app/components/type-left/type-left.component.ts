import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/model/model';
import { TypesLeftPipe } from 'src/app/pipes/types-left.pipe';
import { ServiziService } from 'src/app/services/servizi.service';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
interface TypoLeft{
  id:number,
  value:number,
  isSelected:boolean
}
@Component({
  selector: 'app-type-left',
  templateUrl: './type-left.component.html',
  styleUrls: ['./type-left.component.scss']
})


export class TypeLeftComponent implements OnInit {
  
// tipi di sinistri
  typesLeft:any[]=Array.from({length: 3}, (_, i) => ({id: i+1, value:i+1,isSelected: false}) ) // checklist 
  masterSelected: boolean;
  checkedList: any;
// ngModel 

ngModel:[]=[];

  constructor(public service:ServiziService, public fb:FormBuilder,) {
    this.masterSelected = false
  this.typesLeft
   }
ngOnInit(): void {
  console.log(this.typesLeft)
}

// The master checkbox will check/ uncheck all items
checkUncheckAll() {
 
  this.typesLeft.map((item)=>{
    item.isSelected = this.masterSelected
  })
  this.getCheckedItemList();
}
 // Check All Checkbox Checked
 isAllSelected() {
  this.masterSelected = this. typesLeft.every(function (item: TypoLeft) {
    return item.isSelected == true;
  });
  this.getCheckedItemList();
}
 // Get List of Checked Items
 getCheckedItemList() {
  this.checkedList = [];

 this.typesLeft.filter((item:TypoLeft)=>{
  item.isSelected && this.checkedList.push(item);
 })
  this.checkedList = JSON.stringify(this.checkedList);
}
onRegister(){
  // fare qui la chiamata al back end
  console.log('data to be saved',this.checkedList);
}
  
 

}



