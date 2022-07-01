package com.recordatoriopagos.service;

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
			parametroRepository.save(parametro);
		}
	}

}
