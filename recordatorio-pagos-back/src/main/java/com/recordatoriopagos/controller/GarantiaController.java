package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.dto.GarantiaDto;
import com.recordatoriopagos.models.Garantia;
import com.recordatoriopagos.service.GarantiaService;

@RestController
@RequestMapping("/garantia")
public class GarantiaController {

	@Autowired
	GarantiaService garantiaService;

	@GetMapping()
	public List<GarantiaDto> obtenerGarantias() {
		return garantiaService.obtenerGarantias();
	}

	@GetMapping(path = "/obtenerGarantiasHistoricas")
	public List<GarantiaDto> obtenerGarantiasHistoricas() {
		return garantiaService.obtenerGarantiasHistoricas();
	}

	@PostMapping()
	public ResponseEntity<?> guardarGarantia(@RequestBody Garantia garantia) {
		try {
			garantiaService.guardarGarantia(garantia);
			return new ResponseEntity<Garantia>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@PutMapping(path = "/cerrarGarantia")
	public ResponseEntity<?> cerrarGarantia(@RequestBody BigInteger idGarantia) {
		try {
			garantiaService.cerrarGarantia(idGarantia);
			return new ResponseEntity<Garantia>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@PutMapping(path = "/abrirGarantia")
	public ResponseEntity<?> abrirGarantia(@RequestBody BigInteger idGarantia) {
		try {
			garantiaService.abrirGarantia(idGarantia);
			return new ResponseEntity<Garantia>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

}
