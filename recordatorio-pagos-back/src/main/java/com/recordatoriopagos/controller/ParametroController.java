package com.recordatoriopagos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.models.Parametro;
import com.recordatoriopagos.service.ParametroService;

@RestController
@RequestMapping("/parametro")
public class ParametroController {

	@Autowired
	ParametroService parametroService;

	@GetMapping()
	public List<Parametro> obtenerParametros() {
		return parametroService.obtenerParametros();
	}

	@PostMapping()
	public ResponseEntity<?> guardarParametro(@RequestBody List<Parametro> parametro) {
		try {
			parametroService.guardarParametro(parametro);
			return new ResponseEntity<Parametro>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

}
