import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectos: any;

  constructor(
    private proyectosService: ProyectoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.proyectosService.obtenerProyectos().subscribe(data => {
      this.proyectos = data;
    }, error => {

    });
  }

  editar(idProyecto: string) {
    console.log('test');
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
      console.log(data);
      this.obtenerProyectos();
    }, error => {

    });
  }
}

