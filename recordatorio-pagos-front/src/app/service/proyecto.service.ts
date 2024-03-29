import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Garantia } from '../model/garantia';
import { Proyecto } from '../model/proyecto';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  path: string = environment.apiEndpoint.concat('proyecto');

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  obtenerProyectos() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
      headers: header
    });
  }

  obtenerProyectosPorCliente(idCliente: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/obtenerProyectosPorCliente/${idCliente}`, {
      headers: header
    });
  }

  obtenerTodosProyectosPorCliente(idCliente: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/obtenerTodosProyectosPorCliente/${idCliente}`, {
      headers: header
    });
  }

  obtenerProyectoPorId(id: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/${id}`, {
      headers: header
    });
  }

  guardarProyecto(proyecto: Proyecto) {
    proyecto.usuarioActualizacion = this.usuarioService.obtenerInformacionUsuario().idUsuario;
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, proyecto, {
      headers: header
    });
  }

  eliminarPorId(idProyecto: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.delete(`${this.path}/${idProyecto}`, {
      headers: header
    });
  }

  cerrarProyecto(garantia: Garantia) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/cerrarProyecto`, garantia, {
      headers: header
    });
  }

  abrirProyecto(idProyecto: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/abrirProyecto`, idProyecto, {
      headers: header
    });
  }

}
