import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  error: string;
  tieneError: boolean;

  @ViewChild('loginForm') loginForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.usuario).subscribe(data => {
        if (data) {
          this.tieneError = false;
          this.router.navigateByUrl("/facturas");
        } else {
          this.tieneError = true;
          this.error = "Usuario o contraseña incorrectos";
        }
      }, error => {
        this.tieneError = true;
        this.error = "Se ha producido un error en el sistema";
      });
    } else {
      this.tieneError = true;
      this.error = "Ingresa tu usuario y contraseña";
    }
  }

  refresco() {
    this.tieneError = false;
  }

}
