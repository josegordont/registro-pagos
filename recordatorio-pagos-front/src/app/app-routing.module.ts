import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ClienteDetailComponent } from './pagos/cliente-detail/cliente-detail.component';
import { ClienteComponent } from './pagos/cliente/cliente.component';
import { FacturasDetailComponent } from './pagos/facturas-detail/facturas-detail.component';
import { FacturasComponent } from './pagos/facturas/facturas.component';
import { ProyectoDetailComponent } from './pagos/proyecto-detail/proyecto-detail.component';
import { ProyectoComponent } from './pagos/proyecto/proyecto.component';
import { UsuarioDetailComponent } from './pagos/usuario-detail/usuario-detail.component';
import { UsuarioComponent } from './pagos/usuario/usuario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'facturas/editar/:id', component: FacturasDetailComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/editar/:id', component: ClienteDetailComponent },
  { path: 'proyectos', component: ProyectoComponent },
  { path: 'proyectos/editar/:id', component: ProyectoDetailComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuarios/editar/:id', component: UsuarioDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
