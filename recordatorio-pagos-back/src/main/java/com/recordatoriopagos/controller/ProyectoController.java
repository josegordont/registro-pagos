package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.models.Garantia;
import com.recordatoriopagos.models.Proyecto;
import com.recordatoriopagos.service.ProyectoService;

@RestController
@RequestMapping("/proyecto")
public class ProyectoController {

	@Autowired
	ProyectoService proyectoService;

	@GetMapping()
	public List<Proyecto> obtenerProyectos() {
		return proyectoService.obtenerProyectos();
	}

	@GetMapping(path = "/obtenerProyectosPorCliente/{id}")
	public List<Proyecto> obtenerProyectosPorCliente(@PathVariable("id") BigInteger id) {
		return proyectoService.obtenerProyectosPorCliente(id);
	}

	@GetMapping(path = "/{id}")
	public Optional<Proyecto> obtenerProyectoPorId(@PathVariable("id") BigInteger id) {
		return this.proyectoService.obtenerPorId(id);
	}

	@PostMapping()
	public ResponseEntity<?> guardarProyecto(@RequestBody Proyecto proyecto) {
		try {
			proyectoService.guardarProyecto(proyecto);
			return new ResponseEntity<Proyecto>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			if (e.getMessage().contains("could not execute statement; SQL [n/a]; constraint [proyecto.nombre];")) {
				error = "Ya existe un proyecto registrado con ese nombre";
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.proyectoService.eliminarProyecto(id);
	}

	@PutMapping(path = "cerrarProyecto")
	public ResponseEntity<?> cerrarProyecto(@RequestBody Garantia garantia) {
		try {
			this.proyectoService.cerrarProyecto(garantia);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@PutMapping(path = "abrirProyecto")
	public ResponseEntity<?> abrirProyecto(@RequestBody BigInteger id) {
		try {
			this.proyectoService.abrirProyecto(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}
}
