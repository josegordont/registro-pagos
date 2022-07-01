import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

@NgModule({
  declarations: [
    LoginComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
