package com.recordatoriopagos.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Parametro;
import com.recordatoriopagos.repositories.ParametroRepository;

@Service
public class ParametroService {

	@Autowired
	ParametroRepository parametroRepository;

	public List<Parametro> obtenerParametros() {
		return (List<Parametro>) parametroRepository.findAll();
	}

	public void guardarParametro(List<Parametro> parametros) {
		for (Parametro parametro : parametros) {
			if (parametro.getFechaCreacion() == null) {
				parametro.setFechaCreacion(new Date());
				parametro.setUsuarioCreacion(parametro.getUsuarioActualizacion());
				parametro.setUsuarioActualizacion(null);
			} else {
				parametro.setFechaActualizacion(new Date());
			}
			parametroRepository.save(parametro);
		}
	}

}
