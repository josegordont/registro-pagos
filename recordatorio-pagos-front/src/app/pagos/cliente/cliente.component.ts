import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: any;

  constructor(
    private clientesService: ClienteService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, error => {

    });
  }

  editar(idCliente: string) {
    console.log('test');
    this.router.navigateByUrl(`/clientes/editar/${idCliente}`);
  }

  cerrar(cliente: Cliente) {

  }

  confirmarEliminar(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas eliminar la cliente <b> ${cliente.nombre}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(cliente.idCliente);
      }
    });
  }

  eliminar(idCliente: number) {
    this.clientesService.eliminarPorId(idCliente).subscribe(data => {
      console.log(data);
      this.obtenerClientes();
    }, error => {

    });
  }
}

