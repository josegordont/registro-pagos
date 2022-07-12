import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Garantia } from '../model/garantia';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {

  path: string = environment.apiEndpoint.concat('garantia');

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerGarantias(): Observable<any[]> {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get<any[]>(`${this.path}`, {
      headers: header
    });
  }

  obtenerGarantiasHistoricas(): Observable<any[]> {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get<any[]>(`${this.path}/obtenerGarantiasHistoricas`, {
      headers: header
    });
  }

  guardarGarantia(garantia: Garantia) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, garantia, {
      headers: header
    });
  }

  cerrarGarantia(idGarantia: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/cerrarGarantia`, idGarantia, {
      headers: header
    });
  }

  abrirGarantia(idGarantia: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/abrirGarantia`, idGarantia, {
      headers: header
    });
  }

}
