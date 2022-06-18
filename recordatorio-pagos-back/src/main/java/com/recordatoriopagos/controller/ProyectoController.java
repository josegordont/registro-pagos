package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping(path = "/{id}")
	public Optional<Proyecto> obtenerProyectoPorId(@PathVariable("id") BigInteger id) {
		return this.proyectoService.obtenerPorId(id);
	}

	@PostMapping()
	public Proyecto guardarProyecto(@RequestBody Proyecto proyecto) {
		return this.proyectoService.guardarProyecto(proyecto);
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.proyectoService.eliminarUsuario(id);
	}
}
