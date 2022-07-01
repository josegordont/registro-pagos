import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from 'src/app/directives/constants';
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
  roles: string[] = ["ingreso", "admin"];
  error: string;
  tieneError: boolean;
  loading = false;

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
      this.loading = true;
      this.usuariosService.guardarUsuario(this.usuario).subscribe(data => {
        this.tieneError = false;
        this.snackBarService.success('Usuario guardado!');
        this.router.navigateByUrl("/usuarios");
        this.loading = false;
      }, err => {
        this.tieneError = true;
        this.error = err.error;
        this.loading = false;
      });
    }
  }

  obtenerUsuarioPorId(id: any) {
    this.usuariosService.obtenerUsuarioPorId(id).subscribe(data => {
      this.usuario = data;
    }, error => {

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}
