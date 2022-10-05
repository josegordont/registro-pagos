import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cerrar',
  templateUrl: './dialog-cerrar.component.html',
  styleUrls: ['./dialog-cerrar.component.css']
})
export class DialogCerrarComponent implements OnInit {

  garantia: any = new Object();
  fechaSugerida: Date;
  errorFechas: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogCerrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.garantia.fechaFin = data.fechaFinSugerida;
    this.garantia.total = data.totalGarantia;
    this.fechaSugerida = data.fechaFinSugerida;
  }

  ngOnInit(): void {

  }

  compararFechas() {
    if (this.garantia.fechaFin instanceof Date) {
      if (this.fechaSugerida.getFullYear() === this.garantia.fechaFin.getFullYear() &&
        this.fechaSugerida.getMonth() === this.garantia.fechaFin.getMonth() &&
        this.fechaSugerida.getDay === this.garantia.fechaFin.getDay()) {
        this.errorFechas = 0;
      } else {
        if (this.fechaSugerida > this.garantia.fechaFin) {
          this.errorFechas = -1;
        } else {
          this.errorFechas = 1;
        }
      }
    } else {
      this.errorFechas = 0;
    }
  }

}
