import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Cliente } from 'src/app/model/cliente';
import { Factura } from 'src/app/model/factura';
import { Garantia } from 'src/app/model/garantia';
import { ClienteService } from 'src/app/service/cliente.service';
import { FacturaService } from 'src/app/service/factura.service';
import { GarantiaService } from 'src/app/service/garantia.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class GarantiasComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  clientes: any = [];
  proyectos: any = [];
  rol: string;
  tipoVistaInput: string = 'garantia';
  // actual
  garantias: any = [];
  garantiasFiltro: any = [];
  garantia: any = new Garantia();
  periodoInput: Date;
  // históricos
  garantiasHis: any = [];
  garantiasHisFiltro: any = [];
  garantiaHis: any = new Garantia();
  periodoInputHis: Date;
  // facturas
  facturas: any = [];
  facturasFiltro: any = [];
  // facturas históricas
  facturasHis: any = [];
  facturasHisFiltro: any = [];
  // seleccion
  selectionFacturas = new SelectionModel<Factura>(true, []);
  selectionGarantias = new SelectionModel<Garantia>(true, []);

  constructor(
    private snackBarService: SnackBarService,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private garantiaService: GarantiaService,
    private facturaService: FacturaService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.rol = this.usuarioService.obtenerRol();
    this.obtenerGarantias();
    this.obtenerClientes();
    this.obtenerGarantiasHistoricas();
    this.obtenerFacturas();
    this.obtenerFacturasHistoricas();
  }

  obtenerGarantias() {
    this.garantiaService.obtenerGarantias().subscribe(data => {
      this.garantias = data;
      this.garantiasFiltro = data;
      this.filtrarLista(undefined);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerGarantiasHistoricas() {
    this.garantiaService.obtenerGarantiasHistoricas().subscribe(data => {
      this.garantiasHis = data;
      this.garantiasHisFiltro = data;
      this.filtrarListaHis(undefined);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerProyectosPorCliente(cliente: Cliente) {
    if (cliente !== undefined) {
      this.proyectosService.obtenerTodosProyectosPorCliente(cliente.idCliente).subscribe(data => {
        this.proyectos = data;
      }, err => {
        this.snackBarService.success('Se ha producido un error en el sistema!');
      });
    } else {
      this.garantia.idProyecto = undefined;
    }
  }

  filtrarListaFecha(event: any) {
    if (this.periodoInput instanceof moment) {
      this.periodoInput = new Date(this.periodoInput);
      this.filtrarLista(event);
    } else {
      this.filtrarLista(event);
    }
  }

  filtrarLista(event: any) {
    this.garantiasFiltro = this.garantias;
    this.facturasFiltro = this.facturas;
    if (this.garantia.idCliente !== undefined && this.garantia.idCliente !== null) {
      this.garantiasFiltro = this.garantias.filter((garantia: any) => garantia.idCliente === this.garantia.idCliente);
      this.facturasFiltro = this.facturas.filter((factura: any) => factura.idCliente === this.garantia.idCliente);
    }
    if (this.garantia.idProyecto !== undefined && this.garantia.idProyecto !== null) {
      this.garantiasFiltro = this.garantiasFiltro.filter((garantia: any) => garantia.idProyecto === this.garantia.idProyecto);
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.idProyecto === this.garantia.idProyecto);
    }
    if (this.periodoInput !== undefined && this.periodoInput !== null) {
      this.garantiasFiltro = this.garantiasFiltro.filter((garantia: any) => {
        let fechaDevolucion = new Date(garantia.fechaDevolucion);
        return this.periodoInput.getFullYear() === fechaDevolucion.getFullYear() &&
          this.periodoInput.getMonth() === fechaDevolucion.getMonth();
      });
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => {
        let fechaDevolucion = new Date(factura.fechaFin);
        return this.periodoInput.getFullYear() === fechaDevolucion.getFullYear() &&
          this.periodoInput.getMonth() === fechaDevolucion.getMonth();
      });
    }
  }

  filtrarListaFechaHis(event: any) {
    if (this.periodoInputHis instanceof moment) {
      this.periodoInputHis = new Date(this.periodoInputHis);
      this.filtrarListaHis(event);
    } else {
      this.filtrarListaHis(event);
    }
  }

  filtrarListaHis(event: any) {
    this.garantiasHisFiltro = this.garantiasHis;
    if (this.garantiaHis.idCliente !== undefined && this.garantiaHis.idCliente !== null) {
      this.garantiasHisFiltro = this.garantiasHisFiltro.filter((garantia: any) => garantia.idCliente === this.garantiaHis.idCliente);
    }
    if (this.garantiaHis.idProyecto !== undefined && this.garantiaHis.idProyecto !== null) {
      this.garantiasHisFiltro = this.garantiasHisFiltro.filter((garantia: any) => garantia.idProyecto === this.garantiaHis.idProyecto);
    }
    if (this.periodoInputHis !== undefined && this.periodoInputHis !== null) {
      this.garantiasHisFiltro = this.garantiasHisFiltro.filter((garantia: any) => {
        let fechaDevolucion = new Date(garantia.fechaDevolucion);
        return this.periodoInputHis.getFullYear() === fechaDevolucion.getFullYear() &&
          this.periodoInputHis.getMonth() === fechaDevolucion.getMonth();
      });
    }
  }

  cerrarGarantiaConfirmacion(garantia: Garantia) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas cerrar la garantía del proyecto <b> ${garantia.nombreProyecto}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cerrarGarantia(garantia.idGarantia);
      }
    });
  }

  cerrarGarantia(idGarantia: number) {
    this.garantiaService.cerrarGarantia(idGarantia).subscribe(data => {
      this.snackBarService.success('Garantía cerrado!');
      this.obtenerGarantias();
      this.obtenerGarantiasHistoricas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  abrirGarantiaConfirmacion(garantia: Garantia) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas abrir la garantía del proyecto <b> ${garantia.nombreProyecto}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.abrirGarantia(garantia.idGarantia);
      }
    });
  }

  abrirGarantia(idGarantia: number) {
    this.garantiaService.abrirGarantia(idGarantia).subscribe(data => {
      this.snackBarService.success('Garantía abierta!');
      this.obtenerGarantias();
      this.obtenerGarantiasHistoricas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.periodoInput = new Date();
    this.periodoInput.setMonth(normalizedMonthAndYear.month());
    this.periodoInput.setFullYear(normalizedMonthAndYear.year());
    datepicker.close();
    this.filtrarLista(undefined);
  }

  setMonthAndYearHis(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.periodoInputHis = new Date();
    this.periodoInputHis.setMonth(normalizedMonthAndYear.month());
    this.periodoInputHis.setFullYear(normalizedMonthAndYear.year());
    datepicker.close();
    this.filtrarListaHis(undefined);
  }

  cerrarFacturaConfirmacion(factura: Factura) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas cerrar la factura <b> ${factura.numeroFactura}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cerrarFactura(factura.idFactura);
      }
    });
  }

  cerrarFactura(idFactura: number) {
    this.facturaService.cerrarFactura(idFactura).subscribe(data => {
      this.snackBarService.success('Factura cerrada!');
      this.obtenerFacturas();
      this.obtenerFacturasHistoricas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  abrirFacturaConfirmacion(factura: Factura) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas abrir la factura <b> ${factura.numeroFactura}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.abrirFactura(factura.idFactura);
      }
    });
  }

  abrirFactura(idFactura: number) {
    this.facturaService.abrirFactura(idFactura).subscribe(data => {
      this.snackBarService.success('Factura abierta!');
      this.obtenerFacturasHistoricas();
      this.obtenerFacturas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerFacturas() {
    this.facturaService.obtenerFacturasACerrar().subscribe(data => {
      this.facturas = data;
      this.facturasFiltro = data;
      this.filtrarLista(undefined);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerFacturasHistoricas() {
    this.facturaService.obtenerFacturasCerradas().subscribe(data => {
      this.facturasHis = data;
      this.facturasHisFiltro = data;
      this.filtrarListaHis(undefined);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  abrirProyectoConfirmacion(factura: Factura) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas abrir el proyecto <b> ${factura.nombreProyecto}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.abrirProyecto(factura.idProyecto);
      }
    });
  }

  abrirProyecto(idProyecto: number) {
    this.proyectosService.abrirProyecto(idProyecto).subscribe(data => {
      this.snackBarService.success('Proyecto abierto!');
      this.obtenerFacturas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  masterToggleFacturas() {
    this.isAllSelectedFacturas() ?
      this.selectionFacturas.clear() :
      this.facturasFiltro.forEach((row: any) => { this.selectionFacturas.select(row) });
  }

  isAllSelectedFacturas() {
    const numSelected = this.selectionFacturas.selected.length;
    const numRows = this.facturasFiltro.length;
    return numSelected === numRows;
  }

  cerrarVariasFacturasConfirmacion() {
    let numeroFacturas = '<ul>';
    this.selectionFacturas.selected.forEach(factura => {
      numeroFacturas += '<li>'.concat(factura.numeroFactura);
    });
    numeroFacturas += '</ul>';
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas cerrar las siguientes facturas? <b> ${numeroFacturas}</b>`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cerrarVariasFacturas(this.selectionFacturas.selected);
      }
    });
  }

  cerrarVariasFacturas(facturasSeleccionadas: Factura[]) {
    let idFacturas: number[] = [];
    facturasSeleccionadas.forEach(factura => {
      idFacturas.push(factura.idFactura);
    });
    this.facturaService.cerrarVariasFacturas(idFacturas).subscribe(data => {
      this.snackBarService.success('Facturas cerradas!');
      this.selectionFacturas.clear();
      this.obtenerFacturas();
      this.obtenerFacturasHistoricas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  masterToggleGarantias() {
    this.isAllSelectedGarantias() ?
      this.selectionGarantias.clear() :
      this.garantiasFiltro.forEach((row: any) => { this.selectionGarantias.select(row) });
  }

  isAllSelectedGarantias() {
    const numSelected = this.selectionGarantias.selected.length;
    const numRows = this.garantiasFiltro.length;
    return numSelected === numRows;
  }

  cerrarVariasGarantiasConfirmacion() {
    let nombreProyectos = '<ul>';
    this.selectionGarantias.selected.forEach(garantia => {
      nombreProyectos += '<li>'.concat(garantia.nombreProyecto ?? '');
    });
    nombreProyectos += '</ul>';
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas cerrar las garantias de los siguientes proyectos? <b> ${nombreProyectos}</b>`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cerrarVariasGarantias(this.selectionGarantias.selected);
      }
    });
  }

  cerrarVariasGarantias(garantiasSeleccionadas: Garantia[]) {
    let idGarantias: number[] = [];
    garantiasSeleccionadas.forEach(garantia => {
      idGarantias.push(garantia.idGarantia);
    });
    this.garantiaService.cerrarVariasGarantias(idGarantias).subscribe(data => {
      this.snackBarService.success('Garantías cerradas!');
      this.selectionGarantias.clear();
      this.obtenerGarantias();
      this.obtenerGarantiasHistoricas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

}
