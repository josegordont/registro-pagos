import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  path: string = environment.apiEndpoint.concat('usuario');

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerInformacionUsuario(): Usuario {
    return JSON.parse(atob(sessionStorage.getItem(btoa('currentUser'))));
  }

  obtenerUsuarios() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
      headers: header
    });
  }

  obtenerUsuarioPorId(id: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/${id}`, {
      headers: header
    });
  }

  guardarUsuario(usuario: Usuario) {
    usuario.usuarioActualizacion = this.obtenerInformacionUsuario().idUsuario;
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, usuario, {
      headers: header
    });
  }

  eliminarPorId(idUsuario: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.delete(`${this.path}/${idUsuario}`, {
      headers: header
    });
  }

  login(usuario: Usuario): Observable<Usuario> {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post<Usuario>(`${this.path}/login`, usuario, {
      headers: header
    });
  }

  obtenerRol(): string {
    const currentUserEncode = sessionStorage.getItem(btoa('currentUser'));
    if (currentUserEncode) {
      const currentUser: Usuario = JSON.parse(atob(currentUserEncode));
      return currentUser.rol;
    } else {
      return '';
    }
  }

  cambioContrasena(usuario: any): Observable<Usuario> {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put<Usuario>(`${this.path}/cambio-contrasena`, usuario, {
      headers: header
    });
  }

}
