package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Garantia;
import com.recordatoriopagos.models.Proyecto;
import com.recordatoriopagos.repositories.ProyectoRepository;

@Service
public class ProyectoService {

	@Autowired
	ProyectoRepository proyectoRepository;

	@Autowired
	GarantiaService garantiaService;

	public List<Proyecto> obtenerProyectos() {
		return proyectoRepository.obtenerProyectos();
	}

	public List<Proyecto> obtenerTodosProyectosPorCliente(BigInteger idCliente) {
		return proyectoRepository.findByIdCliente(idCliente);
	}

	public List<Proyecto> obtenerProyectosPorCliente(BigInteger idCliente) {
		return proyectoRepository.findByIdClienteAndEstado(idCliente, "abierto");
	}

	public Optional<Proyecto> obtenerPorId(BigInteger id) {
		return proyectoRepository.findById(id);
	}

	public Proyecto guardarProyecto(Proyecto proyecto) {
		if (proyecto.getFechaCreacion() == null) {
			proyecto.setFechaCreacion(new Date());
			proyecto.setUsuarioCreacion(proyecto.getUsuarioActualizacion());
			proyecto.setUsuarioActualizacion(null);
		} else {
			proyecto.setFechaActualizacion(new Date());
		}
		return proyectoRepository.save(proyecto);
	}

	public boolean eliminarProyecto(BigInteger idProyecto) {
		try {
			if (proyectoRepository.obtenerFacturasPorProyecto(idProyecto).size() > 0) {
				return false;
			}
			proyectoRepository.deleteById(idProyecto);
			return true;
		} catch (Exception err) {
			return false;
		}
	}

	public void cerrarProyecto(Garantia garantia) {
		proyectoRepository.cerrarProyecto(garantia.getIdProyecto());
		garantiaService.eliminarGarantiaPorProyecto(garantia.getIdProyecto());
		garantia.setEstado("abierto");
		garantiaService.guardarGarantia(garantia);
	}

	public void abrirProyecto(BigInteger idProyecto) {
		proyectoRepository.abrirProyecto(idProyecto);
		garantiaService.eliminarGarantiaPorProyecto(idProyecto);
	}
}
