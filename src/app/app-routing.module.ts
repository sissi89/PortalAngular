import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ServiziComponent } from './components/servizi/servizi.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'Servizi',
    component:ServiziComponent
  },{
    path:'Login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
