import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MonitoresService } from 'src/app/Servicios/Monitores/monitores.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;
  formMonitores !: FormGroup;
  cargando : boolean = false;
  datosMonitores : any [] = [];
  columnasSeleccionadas : any [] = [];
  dialogo : boolean = false;
  tituloModal : string = 'Crear';
  registroSeleccionado : any;

  constructor(private messageService: MessageService,
                private frmBuilder : FormBuilder,
                  private monitoresService : MonitoresService,) {

    this.formMonitores = this.frmBuilder.group({
      Marca : [null, Validators.required],
      Resolucion : [null, Validators.required],
      TamanoPantalla : [null, Validators.required],
      Calificacion : [null, Validators.required],
      VelocidadPantalla : [null, Validators.required],
      Precio : [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.consultarMonitores();
  }

  // Funcion que va a limpiar los campos
  limpiarTodo(){
    this.cargando = false;
    this.formMonitores.reset();
    this.datosMonitores = [];
    this.dialogo = false;
  }

  // Funcion que permitirá filtrar la información de la tabla
  aplicarfiltroGlobal($event : any, valorCampo : string){
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, valorCampo);
  }

  // Funcion que va a consultar los datos de los monitores
  consultarMonitores(){
    this.cargando = true;
    this.monitoresService.GetTodo().subscribe(datos => {
      for (let i = 0; i < datos.length; i++) {
        let info : any = {
          Id : datos[i].id,
          Marca : datos[i].brand,
          Resolucion : datos[i].max_resolution,
          TamanoPantalla : datos[i].size_screen,
          Calificacion : datos[i].qualification,
          VelocidadPantalla : datos[i].update_rate,
          Precio : datos[i].price,
        }
        this.datosMonitores.push(info);
      }
    });
    setTimeout(() => { this.cargando = false; }, 2000);    
  }

  // Funcion que va a realizar un nuevo registro de monitor
  registrarMonitor(){
    if (this.tituloModal == 'Crear') {
      let info : any = {
        brand : this.formMonitores.value.Marca,
        max_resolution : this.formMonitores.value.Resolucion,
        size_screen : this.formMonitores.value.TamanoPantalla,
        qualification : this.formMonitores.value.Calificacion,
        update_rate : this.formMonitores.value.VelocidadPantalla,
        price : this.formMonitores.value.Precio,
      }
      this.monitoresService.Insert(info).subscribe(data => {
        this.mensajeconfirmacion(`¡Se ha creado un nuevo registro!`);
        this.limpiarTodo();
        this.consultarMonitores();
      }, error => { this.mensajeError(`¡Ocurrió un error al realizar el registro!`); });
    } else if (this.tituloModal == 'Actualizar') {
      let info : any = {
        id : this.registroSeleccionado.Id,
        brand : this.formMonitores.value.Marca,
        max_resolution : this.formMonitores.value.Resolucion,
        size_screen : this.formMonitores.value.TamanoPantalla,
        qualification : this.formMonitores.value.Calificacion,
        update_rate : this.formMonitores.value.VelocidadPantalla,
        price : this.formMonitores.value.Precio,
      }
      this.monitoresService.Put(this.registroSeleccionado.Id, info).subscribe(data => {
        this.mensajeconfirmacion(`¡Se ha actaulizado un nuevo registro!`);
        this.limpiarTodo();
        this.consultarMonitores();
      }, error => { this.mensajeError(`¡Ocurrió un error al realizar la actualización!`); });
    }
  }

  // Funcion que va a realizar la eliminacion de un monitor
  eliminarMonitor(data : any){
    this.monitoresService.Delete(data.Id).subscribe(datos => {
      this.mensajeconfirmacion(`¡Se ha eliminado el monitor de marca ${data.Marca}!`);
      this.limpiarTodo();
      this.consultarMonitores();
    }, error => { this.mensajeError(`¡Ocurrió un error al eliminar el regitro del monitor seleccionado!`); });
  }

  // Funcion que va a mostrar un modal
  mostrarModal(){
    this.formMonitores.reset();
    this.dialogo = true;
    this.tituloModal = 'Crear';
  }

  // Funcion que va a reaizar la actualizacion de un monitor
  mostraMonitorModal(data : any){
    this.dialogo = true;
    this.registroSeleccionado = data;
    this.tituloModal = 'Actualizar';
    this.formMonitores.patchValue({
      Marca : data.Marca,
      Resolucion : data.Resolucion,
      TamanoPantalla : data.TamanoPantalla,
      Calificacion : data.Calificacion,
      VelocidadPantalla : data.VelocidadPantalla,
      Precio : data.Precio,
    });
  }
  
  exportarExcel() {
    this.cargando = true;
    setTimeout(() => {
      const title = `Listado de Monitores`;
      const header = ["Marca", "Resolucion", "Tamaño de Pantalla", "Calificación", "Velocidad de Pantalla", "Precio"]
      let datos : any =[];
      for (const item of this.datosMonitores) {
        const datos1  : any = [item.Marca, item.Resolucion, item.TamanoPantalla, item.Calificacion, item.VelocidadPantalla, item.Precio];
        datos.push(datos1);
      }
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet(`Listado de Monitores`);
      let titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'double', bold: true };
      worksheet.addRow([]);
      let headerRow = worksheet.addRow(header);
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'eeeeee' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });
      worksheet.mergeCells('A1:F2');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
      datos.forEach((d: any) => {
        let row = worksheet.addRow(d);
      });
      worksheet.getColumn(1).width = 15;
      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 15;
      worksheet.getColumn(4).width = 15;
      worksheet.getColumn(5).width = 15;
      worksheet.getColumn(6).width = 15;

      setTimeout(() => {
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, `Listado de usuarios.xlsx`);
        });
        this.cargando = false;
      }, 1000);
    }, 3500);
    setTimeout(() => { this.mensajeconfirmacion(`¡La información de los monitores ha sido exportada a un archivo de excel!`); }, 4000);
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
