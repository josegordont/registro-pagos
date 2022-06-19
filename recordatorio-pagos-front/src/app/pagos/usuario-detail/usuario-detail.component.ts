import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Cliente } from 'src/app/model/cliente';
import { Usuario } from 'src/app/model/usuario';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  usuario: any = new Usuario();
  roles: string[] = ["consulta", "admin"];
  error: string;

  @ViewChild('usuarioForm') usuarioForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private usuariosService: UsuarioService,
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    let id = this.activeteRoute.snapshot.paramMap.get('id');
    if (id !== undefined && id !== '0') {
      this.obtenerUsuarioPorId(id);
    }
  }

  save() {
    if (this.usuarioForm.valid) {
      this.usuariosService.guardarUsuario(this.usuario).subscribe(data => {
        this.snackBarService.success('Usuario guardado!');
        this.router.navigateByUrl("/usuarios");
      }, error => {

      });
    }
  }

  obtenerUsuarioPorId(id: any) {
    this.usuariosService.obtenerUsuarioPorId(id).subscribe(data => {
      this.usuario = data;
    }, error => {

    });
  }

}
