import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiziComponent } from './components/servizi/servizi.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { TabsComponent } from './components/tabs/tabs.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GeneraleComponent } from './components/generale/generale.component';
import { ComunicazioneComponent } from './components/comunicazione/comunicazione.component';
//import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DocumentiComponent } from './components/documenti/documenti.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TypesLeftPipe } from './pipes/types-left.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    ServiziComponent,
    TabsComponent,
    GeneraleComponent,
    ComunicazioneComponent,
    DocumentiComponent,
    TypesLeftPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule ,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
