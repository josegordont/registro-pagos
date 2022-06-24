import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  loading = false;

  @ViewChild('loginForm') loginForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.usuarioService.login(this.usuario).subscribe(data => {
        if (data !== undefined && data !== null) {
          this.tieneError = false;
          sessionStorage.setItem(btoa('currentUser'), btoa(JSON.stringify(data)));
          this.loading = false;
          this.router.navigateByUrl("/facturas");
        } else {
          this.tieneError = true;
          this.error = "Usuario o contraseña incorrectos";
          this.loading = false;
        }
      }, error => {
        this.tieneError = true;
        this.error = "Se ha producido un error en el sistema";
        this.loading = false;
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
