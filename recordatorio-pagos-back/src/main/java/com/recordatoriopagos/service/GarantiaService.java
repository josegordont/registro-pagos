package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.dto.DatosGarantiaDto;
import com.recordatoriopagos.dto.GarantiaDto;
import com.recordatoriopagos.models.Garantia;
import com.recordatoriopagos.repositories.GarantiaRepository;

@Service
public class GarantiaService {

	@Autowired
	GarantiaRepository garantiaRepository;

	public List<GarantiaDto> obtenerGarantias() {
		return (List<GarantiaDto>) garantiaRepository.obtenerGarantias();
	}

	public List<GarantiaDto> obtenerGarantiasHistoricas() {
		return (List<GarantiaDto>) garantiaRepository.obtenerGarantiasHistoricas();
	}

	public Garantia guardarGarantia(Garantia garantia) {
		if (garantia.getFechaCreacion() == null) {
			garantia.setFechaCreacion(new Date());
			garantia.setUsuarioCreacion(garantia.getUsuarioActualizacion());
			garantia.setUsuarioActualizacion(null);
		} else {
			garantia.setFechaActualizacion(new Date());
		}
		return garantiaRepository.save(garantia);
	}

	public void eliminarGarantiaPorProyecto(BigInteger idProyecto) {
		Optional<Garantia> garantia = garantiaRepository.findByIdProyecto(idProyecto);
		if (garantia.isPresent()) {
			garantiaRepository.deleteById(garantia.get().getIdGarantia());
		}
	}

	public void cerrarGarantia(BigInteger idGarantia) {
		Garantia garantia = garantiaRepository.findById(idGarantia).get();
		garantia.setEstado("cerrado");
		garantia.setFechaCierre(new Date());
		garantiaRepository.save(garantia);
	}

	public void abrirGarantia(BigInteger idGarantia) {
		Garantia garantia = garantiaRepository.findById(idGarantia).get();
		garantia.setEstado("abierto");
		garantia.setFechaCierre(null);
		garantiaRepository.save(garantia);
	}

	public void cerrarVariasGarantias(List<BigInteger> idGarantias) {
		garantiaRepository.cerrarVariasGarantias(idGarantias);
	}

	public DatosGarantiaDto obtenerDatosGarantia(BigInteger idProyecto) {
		return garantiaRepository.obtenerDatosGarantia(idProyecto);
	}

}
