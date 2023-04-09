import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { DashboardComponent } from './Vistas/dashboard/dashboard.component';
import { DatosComponent } from './Vistas/datos/datos.component';
import { LoginComponent } from './Vistas/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog'
import { MenuLateralComponent } from './Vistas/menu-lateral/menu-lateral.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DatosComponent,
    MenuLateralComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ChartModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
