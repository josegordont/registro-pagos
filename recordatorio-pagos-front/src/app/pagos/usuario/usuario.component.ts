import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogAnimationComponent } from '../dialog-animation/dialog-animation.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: any;

  constructor(
    private usuariosService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe(data => {
      this.usuarios = data;
    }, error => {

    });
  }

  editar(idUsuario: string) {
    this.router.navigateByUrl(`/usuarios/editar/${idUsuario}`);
  }

  confirmarEliminar(usuario: Usuario) {
    const dialogRef = this.dialog.open(DialogAnimationComponent, {
      width: '250px',
      data: {
        'body': `¿Estás seguro que deseas eliminar la usuario <b> ${usuario.correo}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(usuario.idUsuario);
      }
    });
  }

  eliminar(idUsuario: number) {
    this.usuariosService.eliminarPorId(idUsuario).subscribe(data => {
      if (data) {
        this.snackBarService.success('Usuario eliminado!');
        this.obtenerUsuarios();
      } else {
        this.snackBarService.success('Se a producido un error en el sistema');
      }
    }, error => {

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }
}

