import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';
import { Garantia } from '../model/garantia';

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

  obtenerFacturasHistoricas() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}`, {
      headers: header
    });
  }

  obtenerFacturasACerrar() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/obtenerFacturasACerrar`, {
      headers: header
    });
  }

  obtenerFacturasCerradas() {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/obtenerFacturasCerradas`, {
      headers: header
    });
  }

  obtenerFacturaPorId(id: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.path}/obtenerFacturaPorId/${id}`, {
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

  existeNumeroFactura(numeroFactura: string) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.get<boolean>(`${this.path}/existeNumeroFactura/${numeroFactura}`, {
      headers: header
    });
  }

  cerrarFactura(idFactura: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/cerrarFactura`, idFactura, {
      headers: header
    });
  }

  abrirFactura(idFactura: number) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/abrirFactura`, idFactura, {
      headers: header
    });
  }

  cerrarVariasFacturas(idFacturas: number[]) {
    let header = new HttpHeaders().
      set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.path}/cerrarVariasFacturas`, idFacturas, {
      headers: header
    });
  }

}
