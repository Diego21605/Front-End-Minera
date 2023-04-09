import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  cargando : boolean = false;
  datosMonitores : any [] = [];
  columnasSeleccionadas : any [] = [];
  dialogo : boolean = false;
  tituloModal : string = '';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  // Funcion que permitirá filtrar la información de la tabla
  aplicarfiltroGlobal($event : any, valorCampo : string){
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, valorCampo);
  }

  // Funcion que va a consultar los datos de los monitores
  consultarMonitores(){
    this.cargando = false;
    this.cargando = true;
  }

  // Funcion que va a realizar un nuevo registro de monitor
  registrarMonitor(){

  }

  // Funcion que va a reaizar la actualizacion de un monitor
  actualizarMonitor(){

  }

  // Funcion que va a realizar la eliminacion de un monitor
  eliminarMonitor(){

  }

  // Funcion que va a mostrar el modal de editar o crear un registro
  mostrarModal(){
    this.dialogo = true;
  }
  
  // Funcion que va a devolver un mensaje de error
  mensajeError(mensaje : string){
    this.messageService.add({ severity: 'error', summary: '¡Ha ocurrido un error!', detail: mensaje });
  }

  // Funcion que va a devolcer un mensaje de advertencia
  mensajeAdvertencia(mensaje : string){
    this.messageService.add({ severity: 'warn', summary: '¡Advertencia!', detail: mensaje });
  }

  // Funcion que va a devolver un mensaje de confirmacion
  mensajeconfirmacion(mensaje : string){
    this.messageService.add({ severity: 'success', summary: '¡Registro Exitoso!', detail: mensaje });
  }
}
