import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CUSTOM_DATE_FORMAT, DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Cliente } from 'src/app/model/cliente';
import { Factura } from 'src/app/model/factura';
import { ClienteService } from 'src/app/service/cliente.service';
import { FacturaService } from 'src/app/service/factura.service';
import { ParametroService } from 'src/app/service/parametro.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-facturas-detail',
  templateUrl: './facturas-detail.component.html',
  styleUrls: ['./facturas-detail.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT }
  ]
})
export class FacturasDetailComponent implements OnInit {

  factura: any = new Factura();
  idFactura: any;
  clientes: any = [];
  proyectos: any = [];
  fechaActual: Date = new Date();
  diasVencimiento: number;
  fechaSugerida: Date = new Date();
  fechaFinIgualSugerida: boolean = true;
  existeNumeroFactura: boolean;
  montoOriginal: number;
  retencionOriginal: number;

  @ViewChild('facturaForm') facturaForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private facturasService: FacturaService,
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private snackBarService: SnackBarService,
    private parametroService: ParametroService,
    public dialog: MatDialog,
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.fechaActual.setHours(0);
    this.fechaActual.setMinutes(0);
    this.fechaActual.setSeconds(0);
    this.fechaActual.setMilliseconds(0);
    this.factura.fechaInicio = this.fechaActual;
  }

  ngOnInit(): void {
    this.obtenerClientes();
    this.idFactura = this.activeteRoute.snapshot.paramMap.get('id');
    if (this.idFactura !== undefined && this.idFactura !== '0') {
      this.obtenerFacturaPorId(this.idFactura);
    } else {
      this.obtenerParametros();
    }
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
      this.factura.idProyecto = undefined;
    }
  }

  guardarConfirmacion() {
    if (this.facturaForm.valid && !this.existeNumeroFactura) {
      if (this.factura.idFactura !== null && this.factura.idFactura !== undefined) {
        if (this.factura.monto !== this.montoOriginal || this.factura.retencion !== this.retencionOriginal) {
          const dialogRef = this.dialog.open(DialogAnimationComponent, {
            width: '250px',
            data: {
              'body': `¿Estás seguro que deseas guardar la factura?. Se ha actualizado el monto ó la retención.`
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.guardar();
            }
          });
        } else {
          this.guardar();
        }
      }
    }
  }

  guardar() {
    this.facturasService.guardarFactura(this.factura).subscribe(data => {
      this.snackBarService.success('Factura guardada!');
      this.router.navigateByUrl("/facturas");
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  obtenerFacturaPorId(id: any) {
    this.facturasService.obtenerFacturaPorId(id).subscribe(data => {
      this.factura = data;
      this.montoOriginal = this.factura.monto;
      this.retencionOriginal = this.factura.retencion;
      let idCliente = Number(this.activeteRoute.snapshot.paramMap.get('idCliente'));
      this.factura.idCliente = idCliente;
      this.obtenerProyectosPorCliente({ idCliente: idCliente, ruc: '', nombre: '' });
      this.obtenerParametros();
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  obtenerParametros() {
    this.parametroService.obtenerParametros().subscribe(data => {
      this.diasVencimiento = Number(data.find((parametro: any) => parametro.clave === 'fact_mensual').valor);
      this.fechaSugerida.setDate(new Date(this.factura.fechaInicio).getDate() + this.diasVencimiento);
      if (this.idFactura === '0') {
        this.factura.fechaFin = this.fechaSugerida;
        this.fechaFinIgualSugerida = true;
      } else {
        this.fechaFinIgualSugerida = this.fechasIguales(new Date(this.factura.fechaFin), this.fechaSugerida);
      }
    }, err => {
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  cambioFechaFin(event: any) {
    if (event.value) {
      this.fechaFinIgualSugerida = this.fechasIguales(event.value._d, this.fechaSugerida);
    }
  }

  fechasIguales(fecha1: Date, fecha2: Date) {
    return fecha1.getFullYear() === fecha2.getFullYear() &&
      fecha1.getMonth() === fecha2.getMonth() &&
      fecha1.getDay() === fecha2.getDay();
  }

  existeNumeroFacturaFuncion(numeroFactura: string) {
    this.facturasService.existeNumeroFactura(numeroFactura).subscribe(data => {
      this.existeNumeroFactura = data;
    }, err => {
      this.existeNumeroFactura = true;
      this.snackBarService.success('Se ha producido un error en el sistema!');
    });
  }

  calcularImpuestos() {
    if (this.factura.monto !== undefined && this.factura.monto !== '') {
      this.factura.retencion = this.factura.monto * 0.05;
      this.factura.iva = this.factura.monto * 0.21;
      this.factura.total = this.factura.monto - this.factura.retencion + this.factura.iva;
    } else {
      this.factura.retencion = 0;
      this.factura.iva = 0;
      this.factura.total = 0;
    }
  }

  cambioInpuestos() {
    if (this.factura.retencion === undefined && this.factura.retencion === '') {
      this.factura.retencion = 0;
    }
    if (this.factura.iva === undefined && this.factura.iva === '') {
      this.factura.iva = 0;
    }
    this.factura.total = this.factura.monto - this.factura.retencion + this.factura.iva;
  }

}
