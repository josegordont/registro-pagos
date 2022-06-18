import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  path: string = environment.apiEndpoint.concat('factura');

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerFacturas() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
      headers: header
    });
  }

  obtenerFacturaPorId(id: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/${id}`, {
      headers: header
    });
  }

  guardarFactura(factura: Factura) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.path}`, factura, {
      headers: header
    });
  }

  eliminarPorId(idFactura: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.delete(`${this.path}/${idFactura}`, {
      headers: header
    });
  }
}
