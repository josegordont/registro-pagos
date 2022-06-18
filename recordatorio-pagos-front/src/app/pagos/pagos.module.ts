import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { CustomDirectiveModule } from '../directives/custom-format.directive';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogAnimationComponent } from './dialog-animation/dialog-animation.component';
import { FacturasDetailComponent } from './facturas-detail/facturas-detail.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    FacturasComponent,
    FacturasDetailComponent,
    DialogAnimationComponent,
    ClienteComponent,
    ClienteDetailComponent,
    ProyectoComponent,
    ProyectoDetailComponent,
    UsuarioComponent,
    UsuarioDetailComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    CustomDirectiveModule,
    NgxMaskModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDialogModule
  ]
})
export class PagosModule { }
