import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Proyecto } from 'src/app/model/proyecto';
import { ClienteService } from 'src/app/service/cliente.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-proyecto-detail',
  templateUrl: './proyecto-detail.component.html',
  styleUrls: ['./proyecto-detail.component.css']
})
export class ProyectoDetailComponent implements OnInit {

  proyecto: any = new Proyecto();
  clientes: any = [];
  tieneError: true;
  error: string;

  @ViewChild('proyectoForm') proyectoForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private proyectosService: ProyectoService,
    private clienteService: ClienteService,
    private activeteRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    this.obtenerClientes();
    let id = this.activeteRoute.snapshot.paramMap.get('id');
    if (id !== undefined && id !== '0') {
      this.obtenerProyectoPorId(id);
    }
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(data => {
      this.clientes = data;
    }, error => {

    });
  }

  save() {
    if (this.proyectoForm.valid) {
      this.proyectosService.guardarProyecto(this.proyecto).subscribe(data => {
        this.snackBarService.success('Proyecto guardado!');
        this.router.navigateByUrl("/proyectos");
      }, err => {
        this.tieneError = true;
        this.error = err.error;
      });
    }
  }

  obtenerProyectoPorId(id: any) {
    this.proyectosService.obtenerProyectoPorId(id).subscribe(data => {
      this.proyecto = data;
    }, error => {

    });
  }

}
