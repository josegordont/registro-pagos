import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {

  cliente: any = new Cliente();
  error: string;
  tieneError: boolean = false;

  @ViewChild('clienteForm') clienteForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private clientesService: ClienteService,
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    let id = this.activeteRoute.snapshot.paramMap.get('id');
    if (id !== undefined && id !== '0') {
      this.obtenerClientePorId(id);
    }
  }

  save() {
    if (this.clienteForm.valid) {
      this.clientesService.guardarCliente(this.cliente).subscribe(data => {
        this.tieneError = false;
        this.snackBarService.success('Cliente guardado!');
        this.router.navigateByUrl("/clientes");
      }, err => {
        this.tieneError = true;
        this.error = err.error;
      });
    }
  }

  obtenerClientePorId(id: any) {
    this.clientesService.obtenerClientePorId(id).subscribe(data => {
      this.cliente = data;
    }, error => {

    });
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}
