import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Factura } from 'src/app/model/factura';
import { FacturaService } from 'src/app/service/factura.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: any;

  constructor(
    private facturasService: FacturaService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas() {
    this.facturasService.obtenerFacturas().subscribe(data => {
      this.facturas = data;
    }, error => {

    });
  }

  editar(idFactura: string) {
    console.log('test');
    this.router.navigateByUrl(`/facturas/editar/${idFactura}`);
  }

  cerrar(factura: Factura) {

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
      console.log(data);
      this.obtenerFacturas();
    }, error => {
      
    });
  }
}

