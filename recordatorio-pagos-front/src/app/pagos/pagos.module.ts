import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { CustomDirectiveModule } from '../directives/custom-format.directive';
import { NavigationComponent } from '../layout/navigation/navigation.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DialogAnimationComponent } from './dialog-animation/dialog-animation.component';
import { DialogCerrarComponent } from './dialog-cerrar/dialog-cerrar.component';
import { FacturasDetailComponent } from './facturas-detail/facturas-detail.component';
import { FacturasComponent } from './facturas/facturas.component';
import { GarantiasComponent } from './garantias/garantias.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    UsuarioDetailComponent,
    NavigationComponent,
    DialogCerrarComponent,
    GarantiasComponent,
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    CustomDirectiveModule,
    NgxMaskModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDialogModule,
    MatSnackBarModule,
    NgbModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class PagosModule { }
