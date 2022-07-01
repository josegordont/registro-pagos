import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/model/cliente';
import { Garantia } from 'src/app/model/garantia';
import { ClienteService } from 'src/app/service/cliente.service';
import { GarantiaService } from 'src/app/service/garantia.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css']
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
  // históricos
  garantiasHis: any = [];
  garantiasHisFiltro: any = [];
  garantiaHis: any = new Garantia();

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

    });
  }

  obtenerGarantiasHistoricas() {
    this.garantiaService.obtenerGarantiasHistoricas().subscribe(data => {
      this.garantiasHis = data;
      this.garantiasHisFiltro = data;
      this.filtrarLista(null);
    }, err => {

    });
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, err => {

    });
  }

  obtenerProyectosPorCliente(cliente: Cliente) {
    if (cliente !== undefined) {
      this.proyectosService.obtenerProyectosPorCliente(cliente.idCliente).subscribe(data => {
        this.proyectos = data;
      }, err => {

      });
    } else {
      this.garantia.idProyecto = undefined;
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
  }

  filtrarListaHis(event: any) {
    this.garantiasHisFiltro = this.garantiasHis;
    if (this.garantiaHis.idCliente !== undefined && this.garantiaHis.idCliente !== null) {
      this.garantiasHisFiltro = this.garantiasHisFiltro.filter((garantia: any) => garantia.idCliente === this.garantiaHis.idCliente);
    }
    if (this.garantiaHis.idProyecto !== undefined && this.garantiaHis.idProyecto !== null) {
      this.garantiasHisFiltro = this.garantiasHisFiltro.filter((garantia: any) => garantia.idProyecto === this.garantiaHis.idProyecto);
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

    });
  }

}
