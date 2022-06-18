import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  path: string = environment.apiEndpoint.concat('proyecto');

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerProyectos() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
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
}
