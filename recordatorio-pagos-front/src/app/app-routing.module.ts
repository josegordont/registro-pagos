import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './authentication/cambiar-contrasena/cambiar-contrasena.component';
import { LoginComponent } from './authentication/login/login.component';
import { ClienteDetailComponent } from './pagos/cliente-detail/cliente-detail.component';
import { ClienteComponent } from './pagos/cliente/cliente.component';
import { FacturasDetailComponent } from './pagos/facturas-detail/facturas-detail.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { GarantiasComponent } from './pagos/garantias/garantias.component';
import { ParametrosComponent } from './pagos/parametros/parametros.component';
import { ProyectoDetailComponent } from './pagos/proyecto-detail/proyecto-detail.component';
import { ProyectoComponent } from './pagos/proyecto/proyecto.component';
import { UsuarioDetailComponent } from './pagos/usuario-detail/usuario-detail.component';
import { UsuarioComponent } from './pagos/usuario/usuario.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_helpers/roles';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cambiarcontrasena', component: CambiarContrasenaComponent },
  {
    path: 'facturas',
    component: FacturasComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'facturas/editar/:id/:idCliente',
    component: FacturasDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'clientes',
    component: ClienteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'clientes/editar/:id',
    component: ClienteDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'proyectos',
    component: ProyectoComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'proyectos/editar/:id',
    component: ProyectoDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'consultas',
    component: GarantiasComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ingreso] }
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'usuarios/editar/:id',
    component: UsuarioDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'parametros',
    component: ParametrosComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
