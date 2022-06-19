import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CUSTOM_DATE_FORMAT, DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Cliente } from 'src/app/model/cliente';
import { Factura } from 'src/app/model/factura';
import { ClienteService } from 'src/app/service/cliente.service';
import { FacturaService } from 'src/app/service/factura.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

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
  clientes: any = [];
  proyectos: any = [];
  tipos: string[] = ["Garantias", "Mensual"];

  @ViewChild('facturaForm') facturaForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private facturasService: FacturaService,
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private proyectosService: ProyectoService,
    private snackBarService: SnackBarService
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    this.obtenerClientes();
    let id = this.activeteRoute.snapshot.paramMap.get('id');
    if (id !== undefined && id !== '0') {
      this.obtenerFacturaPorId(id);
    }
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, error => {

    });
  }

  obtenerProyectosPorCliente(cliente: Cliente) {
    if (cliente !== undefined) {
      this.proyectosService.obtenerProyectosPorCliente(cliente.idCliente).subscribe(data => {
        this.proyectos = data;
      }, error => {

      });
    } else {
      this.factura.idProyecto = undefined;
    }
  }

  save() {
    if (this.facturaForm.valid) {
        this.facturasService.guardarFactura(this.factura).subscribe(data => {
          this.snackBarService.success('Factura guardada!');
          this.router.navigateByUrl("/facturas");
        }, error => {

        });
    }
  }

  obtenerFacturaPorId(id: any) {
    this.facturasService.obtenerFacturaPorId(id).subscribe(data => {
      this.factura = data;
      let idCliente = Number(this.activeteRoute.snapshot.paramMap.get('idCliente'));
      this.factura.idCliente = idCliente;
      this.obtenerProyectosPorCliente({ idCliente: idCliente, ruc: '', nombre: '' });
    }, error => {

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}
