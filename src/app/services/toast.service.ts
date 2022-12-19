import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
//import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( public _snackBar:MatSnackBar) { }


  snackBar(messagge: string, style: string){
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [style];
    config.verticalPosition ='bottom';
    config.horizontalPosition ='left';

    this._snackBar.open(messagge,'',config);
  }
  

}
