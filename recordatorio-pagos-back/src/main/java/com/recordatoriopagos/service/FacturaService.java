package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.repositories.FacturaRepository;

@Service
public class FacturaService {

	@Autowired
	FacturaRepository facturaRepository;

	public List<Factura> obtenerFacturas() {
		return facturaRepository.obtenerFacturas();
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

	public boolean eliminarUsuario(BigInteger idFactura) {
		try {
			facturaRepository.deleteById(idFactura);
			return true;
		} catch (Exception err) {
			return false;
		}
	}
}
