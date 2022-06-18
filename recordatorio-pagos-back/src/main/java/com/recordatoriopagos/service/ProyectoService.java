package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Proyecto;
import com.recordatoriopagos.repositories.ProyectoRepository;

@Service
public class ProyectoService {

	@Autowired
	ProyectoRepository proyectoRepository;

	public List<Proyecto> obtenerProyectos() {
		return (List<Proyecto>) proyectoRepository.findAll();
	}

	public Optional<Proyecto> obtenerPorId(BigInteger id) {
		return proyectoRepository.findById(id);
	}

	public Proyecto guardarProyecto(Proyecto proyecto) {
		if (proyecto.getFechaCreacion() == null) {
			proyecto.setFechaCreacion(new Date());
		} else {
			proyecto.setFechaActualizacion(new Date());
		}
		return proyectoRepository.save(proyecto);
	}

	public boolean eliminarUsuario(BigInteger idProyecto) {
		try {
			proyectoRepository.deleteById(idProyecto);
			return true;
		} catch (Exception err) {
			return false;
		}
	}
}
