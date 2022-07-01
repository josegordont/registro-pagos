import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
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

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: any = [];
  facturasFiltro: any = [];
  page: number = 1;
  pageSize: number = 10;
  factura: any = new Factura();
  clientes: any = [];
  proyectos: any = [];
  estados: string[] = ['abierto', 'cerrado'];
  diasGarantia: number;
  rol: string;

  constructor(
    private facturasService: FacturaService,
    private router: Router,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private parametroService: ParametroService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.rol = this.usuarioService.obtenerRol();
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

    });
  }

  editar(idFactura: string, idCliente: string) {
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

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  filtrarLista(event: any) {
    this.facturasFiltro = this.facturas;
    if (this.factura.idCliente !== undefined && this.factura.idCliente !== null) {
      this.facturasFiltro = this.facturas.filter((factura: any) => factura.idCliente === this.factura.idCliente);
    }
    if (this.factura.idProyecto !== undefined && this.factura.idProyecto !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.idProyecto === this.factura.idProyecto);
    }
    if (this.factura.numeroFactura !== undefined && this.factura.numeroFactura !== null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) =>
        factura.numeroFactura.toUpperCase().includes(this.factura.numeroFactura.toUpperCase())
      );
    }
    if (this.factura.estado !== undefined && this.factura.estado != null) {
      this.facturasFiltro = this.facturasFiltro.filter((factura: any) => factura.estado === this.factura.estado);
    }
  }

  obtenerProyectosPorCliente(cliente: Cliente) {
    if (cliente !== undefined) {
      this.proyectosService.obtenerProyectosPorCliente(cliente.idCliente).subscribe(data => {
        this.proyectos = data;
      }, err => {

      });
    } else {
      this.factura.idProyecto = undefined;
    }
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, err => {

    });
  }

  cerrarProyecto(factura: Factura) {
    let fechaSugerida = new Date();
    fechaSugerida.setDate(new Date(factura.fechaFin).getDate() + this.diasGarantia);
    const dialogRef = this.dialog.open(DialogCerrarComponent, {
      width: '500px',
      data: {
        body: `¿Estás seguro que deseas cerrar el proyecto <b> ${factura.nombreProyecto}</b>?`,
        fechaFinSugerida: fechaSugerida
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let garantia: Garantia = new Garantia();
        garantia.fechaDevolucion = result;
        garantia.idProyecto = factura.idProyecto;
        this.cerrar(garantia);
      }
    });
  }

  cerrar(garantia: Garantia) {
    this.facturasService.cerrarFacturasPorProyecto(garantia).subscribe(data => {
      this.snackBarService.success('Proyecto cerrado!');
      this.obtenerFacturas();
    }, err => {

    });
  }

  obtenerParametros() {
    this.parametroService.obtenerParametros().subscribe(data => {
      this.diasGarantia = Number(data.find((parametro: any) => parametro.clave === 'fact_garantia').valor) + 1;
    }, err => {

    });
  }

  abrirProyecto(factura: Factura) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas abrir el proyecto <b> ${factura.nombreProyecto}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.abrir(factura.idProyecto);
      }
    });
  }

  abrir(idProyecto: number) {
    this.facturasService.abrirFacturasPorProyecto(idProyecto).subscribe(data => {
      this.snackBarService.success('Proyecto abierto!');
      this.obtenerFacturas();
    }, err => {

    });
  }

  getTotal(columna: string): number {
    let total = 0;
    for (let j = 0; j < this.facturasFiltro.length; j++) {
      total += this.facturasFiltro[j][columna];
    }
    return total;
  }

}

