import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametro } from '../model/parametro';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  path: string = environment.apiEndpoint.concat('parametro');

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  obtenerParametros(): Observable<any[]> {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get<any[]>(`${this.path}`, {
      headers: header
    });
  }

  guardarParametro(parametro: Parametro[]) {
    parametro.forEach(element => {
      element.usuarioActualizacion = this.usuarioService.obtenerInformacionUsuario().idUsuario;
    });
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, parametro, {
      headers: header
    });
  }

}
