import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Parametro } from 'src/app/model/parametro';
import { ParametroService } from 'src/app/service/parametro.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  parametros: Parametro[] = [];
  facturaMensualInput: string;
  facturaAnualInput: string;
  notificacion1Input: string;
  notificacion2Input: string;
  correosNotificacionInput: string;

  @ViewChild('parametroForm') parametroForm: FormGroup;

  constructor(
    private parametroService: ParametroService,
    private snackBarService: SnackBarService
  ) {
    this.obtenerParametros();
  }

  ngOnInit(): void {

  }

  guardar() {
    this.parametros.forEach(parametro => {
      switch (parametro.clave) {
        case 'fact_mensual':
          parametro.valor = this.facturaMensualInput;
          break;
        case 'fact_garantia':
          parametro.valor = this.facturaAnualInput;
          break;
        case 'dias_notificacion1':
          parametro.valor = this.notificacion1Input;
          break;
        case 'dias_notificacion2':
          parametro.valor = this.notificacion2Input;
          break;
        case 'correos_notificacion':
          parametro.valor = this.correosNotificacionInput;
          break;
      }
    });
    if (this.parametroForm.valid) {
      this.parametroService.guardarParametro(this.parametros).subscribe(data => {
        this.snackBarService.success('Parametros guardados!');
      }, err => {

      });
    }
  }

  obtenerParametros() {
    this.parametroService.obtenerParametros().subscribe(data => {
      this.parametros = data;
      data.forEach(parametro => {
        switch (parametro.clave) {
          case 'fact_mensual':
            this.facturaMensualInput = parametro.valor;
            break;
          case 'fact_garantia':
            this.facturaAnualInput = parametro.valor;
            break;
          case 'dias_notificacion1':
            this.notificacion1Input = parametro.valor;
            break;
          case 'dias_notificacion2':
            this.notificacion2Input = parametro.valor;
            break;
          case 'correos_notificacion':
            this.correosNotificacionInput = parametro.valor;
            break;
        }
      })
    }, err => {

    });
  }

}
