import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
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
    public dialog: MatDialog
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
    console.log('test');
    this.router.navigateByUrl(`/usuarios/editar/${idUsuario}`);
  }

  cerrar(usuario: Usuario) {

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
      console.log(data);
      this.obtenerUsuarios();
    }, error => {

    });
  }
}

