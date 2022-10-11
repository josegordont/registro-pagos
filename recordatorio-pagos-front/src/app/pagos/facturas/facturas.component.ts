import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { Factura } from 'src/app/model/factura';
import { Garantia } from 'src/app/model/garantia';
import { ClienteService } from 'src/app/service/cliente.service';
import { FacturaService } from 'src/app/service/factura.service';
import { ParametroService } from 'src/app/service/parametro.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';
import { DialogCerrarComponent } from '../dialog-cerrar/dialog-cerrar.component';

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
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class FacturasComponent implements OnInit {

  facturas: any = [];
  facturasFiltro: any = [];
  page: number = 1;
  pageSize: number = 10;
  factura: any = new Factura();
  clientes: any = [];
  proyectos: any = [];
  diasGarantia: number;
  rol: string;
  periodoInput: Date;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private facturasService: FacturaService,
    private router: Router,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private parametroService: ParametroService,
    private usuarioService: UsuarioService,
    private facturaService: FacturaService,
  ) { }

  ngOnInit(): void {
    this.rol = this.usuarioService.obtenerRol();
    if (sessionStorage.getItem('factura') !== null) {
      this.factura = JSON.parse(sessionStorage.getItem('factura'));
      sessionStorage.removeItem('factura');
      if (this.factura.idCliente !== null) {
        this.obtenerProyectosPorCliente(this.factura.idCliente);
      }
    }
    this.obtenerFacturas();
    this.obtenerClientes();
    this.obtenerParametros();
  }

  obtenerFacturas() {
    this.facturasService.obtenerFacturas().subscribe(data => {
      this.facturas = data;
      this.facturasFiltro = data;
      this.filtrarLista(null);
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  editar(idFactura: string, idCliente: string) {
    sessionStorage.setItem('factura', JSON.stringify(this.factura));
    this.router.navigateByUrl(`/facturas/editar/${idFactura}/${idCliente}`);
  }

  confirmarEliminar(factura: Factura) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas eliminar la factura <b> ${factura.numeroFactura}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(factura.idFactura);
      }
    });
  }

  eliminar(idFactura: number) {
    this.facturasService.eliminarPorId(idFactura).subscribe(data => {
      if (data) {
        this.snackBarService.success('Factura eliminada!');
        this.obtenerFacturas();
      } else {
        this.snackBarService.success('Se produjo un error en el sistema');
      }
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  navegar(ruta: string) {
    sessionStorage.setItem('factura', JSON.stringify(this.factura));
    this.router.navigateByUrl(ruta);
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
    this.facturasFiltro = this.facturas;
    this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.estado === this.factura.estado);
    if (this.factura.idCliente !== undefined && this.factura.idCliente !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.idCliente === this.factura.idCliente);
    }
    if (this.factura.idProyecto !== undefined && this.factura.idProyecto !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.idProyecto === this.factura.idProyecto);
    }
    if (this.factura.numeroFactura !== undefined && this.factura.numeroFactura !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) =>
        factura.numeroFactura.toUpperCase().includes(this.factura.numeroFactura.toUpperCase())
      );
    }
    if (this.periodoInput !== undefined && this.periodoInput !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => {
        let fechaFin = new Date(factura.fechaFin);
        return this.periodoInput.getFullYear() === fechaFin.getFullYear() &&
          this.periodoInput.getMonth() === fechaFin.getMonth();
      });
    }
  }

  obtenerProyectosPorCliente(idCliente: number) {
    if (idCliente !== undefined && idCliente !== null) {
      this.factura.idProyecto = undefined;
      this.filtrarLista(undefined);
      this.proyectosService.obtenerProyectosPorCliente(idCliente).subscribe(data => {
        this.proyectos = data;
      }, err => {
        this.snackBarService.success('Se ha producido un error en el sistema!');
      });
    } else {
      this.factura.idProyecto = undefined;
      this.filtrarLista(undefined);
    }
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  cerrarProyecto(factura: Factura) {
    let fechaSugerida = new Date();
    fechaSugerida.setDate(new Date(factura.fechaFin).getDate() + this.diasGarantia);
    let total = 0;
    let numeroFacturas = 0;
    this.facturas.forEach((row: any) => {
      if (factura.idCliente === row.idCliente && factura.idProyecto === row.idProyecto) {
        total += row.retencion;
        numeroFacturas++;
      }
    });
    const dialogRef = this.dialog.open(DialogCerrarComponent, {
      width: '500px',
      data: {
        body: `¿Estás seguro que deseas cerrar el proyecto <b> ${factura.nombreProyecto}</b>?`,
        fechaFinSugerida: fechaSugerida,
        totalGarantia: total,
        numeroFacturas: numeroFacturas
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let garantia: Garantia = new Garantia();
        garantia.fechaDevolucion = result;
        garantia.idProyecto = factura.idProyecto;
        garantia.total = total;
        this.cerrar(garantia);
      }
    });
  }

  cerrar(garantia: Garantia) {
    this.proyectosService.cerrarProyecto(garantia).subscribe(data => {
      this.snackBarService.success('Proyecto cerrado!');
      this.obtenerFacturas();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
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
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerParametros() {
    this.parametroService.obtenerParametros().subscribe(data => {
      this.diasGarantia = Number(data.find((parametro: any) => parametro.clave === 'fact_garantia').valor) + 1;
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  getTotal(columna: string): number {
    let total = 0;
    for (let j = 0; j < this.facturasFiltro.length; j++) {
      total += this.facturasFiltro[j][columna];
    }
    return total;
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.periodoInput = new Date();
    this.periodoInput.setMonth(normalizedMonthAndYear.month());
    this.periodoInput.setFullYear(normalizedMonthAndYear.year());
    datepicker.close();
    this.filtrarLista(undefined);
  }

  onSort({ column, direction }: SortEvent) {
    switch (direction) {
      case 'asc':
        this.facturasFiltro = this.facturasFiltro.sort((factura: any, facturaSiguiente: any) => {
          return facturaSiguiente[column] < factura[column];
        });
        break;
      case 'desc':
        this.facturasFiltro = this.facturasFiltro.sort((factura: any, facturaSiguiente: any) => {
          return facturaSiguiente[column] > factura[column];
        });
        break;
      default:
    }
  }

}

