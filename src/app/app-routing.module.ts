import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneraleComponent } from './components/generale/generale.component';
import { GraficiComponent } from './components/grafici/grafici.component';
import { LoginComponent } from './components/login/login.component';
import { ServiziComponent } from './components/servizi/servizi.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'Servizi',
    component:ServiziComponent,
    canActivate:[AuthGuardService]
  },{
    path:'Login',
    component:LoginComponent
  },{
    path:'Grafici',
    component:GraficiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
