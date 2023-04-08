import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Vistas/login/login.component';
import { DashboardComponent } from './Vistas/dashboard/dashboard.component';
import { DatosComponent } from './Vistas/datos/datos.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Home', component: DashboardComponent},
  {path: 'Datos', component: DatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
