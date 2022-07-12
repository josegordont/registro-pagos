package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.dto.FacturaDto;
import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.repositories.FacturaRepository;

@Service
public class FacturaService {

	@Autowired
	FacturaRepository facturaRepository;

	@Autowired
	GarantiaService garantiaService;

	public List<FacturaDto> obtenerFacturas() {
		return facturaRepository.obtenerFacturas();
	}

	public List<FacturaDto> obtenerFacturasACerrar() {
		return facturaRepository.obtenerFacturasACerrar();
	}

	public List<FacturaDto> obtenerFacturasCerradas() {
		return facturaRepository.obtenerFacturasCerradas();
	}

	public Optional<Factura> obtenerPorId(BigInteger id) {
		return facturaRepository.findById(id);
	}

	public Factura guardarFactura(Factura factura) {
		if (factura.getFechaCreacion() == null) {
			factura.setFechaCreacion(new Date());
		} else {
			factura.setFechaActualizacion(new Date());
		}
		return facturaRepository.save(factura);
	}

	public boolean eliminarFactura(BigInteger idFactura) {
		try {
			facturaRepository.deleteById(idFactura);
			return true;
		} catch (Exception err) {
			return false;
		}
	}

	public Boolean existeNumeroFactura(String numeroFactura) {
		Factura factura = facturaRepository.findByNumeroFactura(numeroFactura);
		return factura != null;
	}

	public void cerrarFactura(BigInteger idFactura) {
		Factura factura = facturaRepository.findById(idFactura).get();
		factura.setEstado("cerrado");
		factura.setFechaCierre(new Date());
		facturaRepository.save(factura);
	}

	public void abrirFactura(BigInteger idFactura) {
		Factura factura = facturaRepository.findById(idFactura).get();
		factura.setEstado("abierto");
		factura.setFechaCierre(null);
		facturaRepository.save(factura);
	}

}
