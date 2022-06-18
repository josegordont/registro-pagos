import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from 'src/app/directives/constants';
import { Cliente } from 'src/app/model/cliente';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-proyecto-detail',
  templateUrl: './proyecto-detail.component.html',
  styleUrls: ['./proyecto-detail.component.css']
})
export class ProyectoDetailComponent implements OnInit {

  proyecto: any = new Proyecto();
  clientes: Cliente[] = [];

  @ViewChild('proyectoForm') proyectoForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private proyectosService: ProyectoService,
    private activeteRoute: ActivatedRoute,
    private router: Router
  ) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  ngOnInit(): void {
    let id = this.activeteRoute.snapshot.paramMap.get('id');
    if (id !== undefined && id !== '0') {
      this.obtenerProyectoPorId(id);
    }
  }

  save() {
    if (this.proyectoForm.valid) {
      this.proyectosService.guardarProyecto(this.proyecto).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl("/proyectos");
      }, error => {

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
