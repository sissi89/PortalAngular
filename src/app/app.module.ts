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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatRadioModule} from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TypesLeftPipe } from './pipes/types-left.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { TypeLeftComponent } from './components/type-left/type-left.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
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
    TypesLeftPipe,
    FilterComponent,
    TypeLeftComponent
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
    NgMultiSelectDropDownModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule
    
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
