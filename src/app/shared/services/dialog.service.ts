import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthComponent } from 'src/app/core/auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAuthComponent(){

    const dialogRef = this.dialog.open(AuthComponent,{
      width: '650px'
    });
  }



}
