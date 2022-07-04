import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ClienteService } from 'src/app/service/cliente.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectos: any;
  proyectosFiltro: any = [];
  proyecto: Proyecto = new Proyecto;
  clientes: any = [];
  rol: string;
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private proyectosService: ProyectoService,
    private router: Router,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.rol = this.usuarioService.obtenerRol();
    this.obtenerProyectos();
    this.obtenerClientes();
  }

  obtenerProyectos() {
    this.proyectosService.obtenerProyectos().subscribe(data => {
      this.proyectosFiltro = data;
      this.proyectos = data;
    }, error => {

    });
  }

  editar(idProyecto: string) {
    this.router.navigateByUrl(`/proyectos/editar/${idProyecto}`);
  }

  cerrar(proyecto: Proyecto) {

  }

  confirmarEliminar(proyecto: Proyecto) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas eliminar la proyecto <b> ${proyecto.nombre}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(proyecto.idProyecto);
      }
    });
  }

  eliminar(idProyecto: number) {
    this.proyectosService.eliminarPorId(idProyecto).subscribe(data => {
      if (data) {
        this.snackBarService.success('Proyecto eliminado!');
        this.obtenerProyectos();
      } else {
        this.snackBarService.success('No se puede borrar el proyecto porque tiene atado facturas');
      }
    }, error => {

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, err => {

    });
  }

  filtrarLista(event: any) {
    this.proyectosFiltro = this.proyectos;
    if (this.proyecto.idCliente !== undefined && this.proyecto.idCliente !== null) {
      this.proyectosFiltro = this.proyectos.filter((proyecto: any) => proyecto.idCliente === this.proyecto.idCliente);
    }
    if (this.proyecto.nombre !== undefined && this.proyecto.nombre !== null) {
      this.proyectosFiltro = this.proyectosFiltro.filter((proyecto: any) =>
        proyecto.nombre.toUpperCase().includes(this.proyecto.nombre.toUpperCase())
      );
    }
  }

}

