import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

//import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( public _snackBar:MatSnackBar) { }


  snackBar(messagge: any, style: string, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?:MatSnackBarVerticalPosition){
   // verticalPosition && horizontalPosition 
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [style];
    config.verticalPosition =verticalPosition;
    config.horizontalPosition =horizontalPosition;

    this._snackBar.open(messagge,'',config);
  }


}
