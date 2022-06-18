package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.service.FacturaService;

@RestController
@RequestMapping("/factura")
public class FacturaController {

	@Autowired
	FacturaService facturaService;

	@GetMapping()
	public List<Factura> obtenerFacturas() {
		return facturaService.obtenerFacturas();
	}

	@GetMapping(path = "/{id}")
	public Optional<Factura> obtenerFacturaPorId(@PathVariable("id") BigInteger id) {
		return this.facturaService.obtenerPorId(id);
	}

	@PostMapping()
	public Factura guardarFactura(@RequestBody Factura factura) {
		return this.facturaService.guardarFactura(factura);
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.facturaService.eliminarUsuario(id);
	}
}
