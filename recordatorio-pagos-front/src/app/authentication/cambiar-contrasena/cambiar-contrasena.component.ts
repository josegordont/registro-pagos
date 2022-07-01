import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  contrasenaActualInput: string;
  nuevaContrasenaInput: string;
  confirmacionContrasenaInput: string;
  error: string;
  tieneError: boolean;
  loading = false;

  @ViewChild('cambiarContrasenaForm') cambiarContrasenaForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  cambiarContrasena() {
    if (this.cambiarContrasenaForm.valid) {
      this.loading = true;
      if (this.nuevaContrasenaInput.length < 8) {
        this.tieneError = true;
        this.error = "La nueva contraseña debe tener al menos 8 digitos";
        this.loading = false;
      } else if (this.nuevaContrasenaInput !== this.confirmacionContrasenaInput) {
        this.tieneError = true;
        this.error = "No coincide la nueva contraseña ingresada";
        this.loading = false;
      } else {
        this.usuarioService.cambioContrasena({
          'correo': sessionStorage.getItem('correoUsuario') ?? '',
          'contrasena': this.contrasenaActualInput,
          'nuevaContrasena': this.nuevaContrasenaInput
        }).subscribe(data => {
          this.snackBarService.success('Contraseña cambiada!');
          this.router.navigateByUrl("/login");
          this.loading = false;
        }, err => {
          this.tieneError = true;
          this.error = err.error;
          this.loading = false;
        });
      }
    } else {
      this.tieneError = true;
      this.error = "Ingresa todos los campos para continuar";
      this.loading = false;
    }
  }

}
