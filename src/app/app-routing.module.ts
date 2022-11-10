import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ServiziComponent } from './components/servizi/servizi.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent
  },{
    path:'Servizi',
    component:ServiziComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
