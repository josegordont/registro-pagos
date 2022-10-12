import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  path: string = environment.apiEndpoint.concat('cliente');

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  obtenerClientes() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
      headers: header
    });
  }

  obtenerClientePorId(id: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/${id}`, {
      headers: header
    });
  }

  guardarCliente(cliente: Cliente) {
    cliente.usuarioActualizacion = this.usuarioService.obtenerInformacionUsuario().idUsuario;
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, cliente, {
      headers: header
    });
  }

  eliminarPorId(idCliente: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.delete(`${this.path}/${idCliente}`, {
      headers: header
    });
  }
}
