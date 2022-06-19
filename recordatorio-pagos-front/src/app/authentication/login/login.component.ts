import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  @ViewChild('loginForm') loginForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.usuario).subscribe(data => {
        console.log(data);
        // this.router.navigateByUrl("/clientes");
      }, error => {

      });
    }
  }

}
