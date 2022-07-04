package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.dto.FacturaDto;
import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.models.Garantia;
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

	public void cerrarFacturasPorProyecto(Garantia garantia) {
		facturaRepository.cerrarFacturasPorProyecto(garantia.getIdProyecto());
		garantiaService.eliminarGarantiaPorProyecto(garantia.getIdProyecto());
		garantia.setEstado("abierto");
		garantiaService.guardarGarantia(garantia);
	}

	public void abrirFacturasPorProyecto(BigInteger idProyecto) {
		facturaRepository.abrirFacturasPorProyecto(idProyecto);
		garantiaService.eliminarGarantiaPorProyecto(idProyecto);
	}

	public Boolean existeNumeroFactura(String numeroFactura) {
		Factura factura = facturaRepository.findByNumeroFactura(numeroFactura);
		return factura != null;
	}

}
