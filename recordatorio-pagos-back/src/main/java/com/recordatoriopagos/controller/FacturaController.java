package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.dto.FacturaDto;
import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.service.FacturaService;

@RestController
@RequestMapping("/factura")
public class FacturaController {

	@Autowired
	FacturaService facturaService;

	@GetMapping()
	public List<FacturaDto> obtenerFacturas() {
		return facturaService.obtenerFacturas();
	}

	@GetMapping(path = "/obtenerFacturasACerrar")
	public List<FacturaDto> obtenerFacturasACerrar() {
		return facturaService.obtenerFacturasACerrar();
	}

	@GetMapping(path = "/obtenerFacturasCerradas")
	public List<FacturaDto> obtenerFacturasCerradas() {
		return facturaService.obtenerFacturasCerradas();
	}

	@GetMapping(path = "/obtenerFacturaPorId/{id}")
	public Optional<Factura> obtenerFacturaPorId(@PathVariable("id") BigInteger id) {
		return this.facturaService.obtenerPorId(id);
	}

	@PostMapping()
	public Factura guardarFactura(@RequestBody Factura factura) {
		return this.facturaService.guardarFactura(factura);
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.facturaService.eliminarFactura(id);
	}

	@GetMapping(path = "/existeNumeroFactura/{numeroFactura}")
	public Boolean existeNumeroFactura(@PathVariable(value = "numeroFactura") String numeroFactura) {
		return this.facturaService.existeNumeroFactura(numeroFactura);
	}

	@PutMapping(path = "abrirFactura")
	public ResponseEntity<?> abrirFactura(@RequestBody BigInteger idProyecto) {
		try {
			facturaService.abrirFactura(idProyecto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@PutMapping(path = "cerrarFactura")
	public ResponseEntity<?> cerrarFactura(@RequestBody BigInteger idProyecto) {
		try {
			facturaService.cerrarFactura(idProyecto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@PutMapping(path = "/cerrarVariasFacturas")
	public ResponseEntity<?> cerrarVariasFacturas(@RequestBody List<BigInteger> idFacturas) {
		try {
			facturaService.cerrarVariasFacturas(idFacturas);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}
}
