import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Cliente } from 'src/app/model/cliente';
import { Garantia } from 'src/app/model/garantia';
import { ClienteService } from 'src/app/service/cliente.service';
import { GarantiaService } from 'src/app/service/garantia.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
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

  garantias: any = [];
  garantiasFiltro: any = [];
  page: number = 1;
  pageSize: number = 10;
  garantia: any = new Garantia();
  clientes: any = [];
  proyectos: any = [];
  rol: string;
  periodoInput: Date;
  // históricos
  garantiasHis: any = [];
  garantiasHisFiltro: any = [];
  garantiaHis: any = new Garantia();
  periodoInputHis: Date;

  constructor(
    private snackBarService: SnackBarService,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private garantiaService: GarantiaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerGarantias();
    this.obtenerClientes();
    this.obtenerGarantiasHistoricas();
  }

  obtenerGarantias() {
    this.garantiaService.obtenerGarantias().subscribe(data => {
      this.garantias = data;
      this.garantiasFiltro = data;
      this.filtrarLista(null);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerGarantiasHistoricas() {
    this.garantiaService.obtenerGarantiasHistoricas().subscribe(data => {
      this.garantiasHis = data;
      this.garantiasHisFiltro = data;
      this.filtrarLista(null);
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
      this.proyectosService.obtenerProyectosPorCliente(cliente.idCliente).subscribe(data => {
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
    if (this.garantia.idCliente !== undefined && this.garantia.idCliente !== null) {
      this.garantiasFiltro = this.garantias.filter((garantia: any) => garantia.idCliente === this.garantia.idCliente);
    }
    if (this.garantia.idProyecto !== undefined && this.garantia.idProyecto !== null) {
      this.garantiasFiltro = this.garantiasFiltro.filter((garantia: any) => garantia.idProyecto === this.garantia.idProyecto);
    }
    if (this.periodoInput !== undefined && this.periodoInput !== null) {
      this.garantiasFiltro = this.garantiasFiltro.filter((garantia: any) => {
        let fechaDevolucion = new Date(garantia.fechaDevolucion);
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

  cerrarGarantia(garantia: Garantia) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas cerrar el proyecto <b> ${garantia.nombreProyecto}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cerrar(garantia.idGarantia);
      }
    });
  }

  cerrar(idGarantia: number) {
    this.garantiaService.cerrarGarantia(idGarantia).subscribe(data => {
      this.snackBarService.success('Proyecto cerrado!');
      this.obtenerGarantias();
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

}
