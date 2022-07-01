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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recordatoriopagos.models.Cliente;
import com.recordatoriopagos.service.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

	@Autowired
	ClienteService clienteService;

	@GetMapping()
	public List<Cliente> obtenerClientes() {
		return clienteService.obtenerClientes();
	}

	@GetMapping(path = "/{id}")
	public Optional<Cliente> obtenerClientePorId(@PathVariable("id") BigInteger id) {
		return this.clienteService.obtenerPorId(id);
	}

	@PostMapping()
	public ResponseEntity<?> guardarCliente(@RequestBody Cliente cliente) {
		try {
			clienteService.guardarCliente(cliente);
			return new ResponseEntity<Cliente>(HttpStatus.OK);
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			if (e.getMessage().contains("could not execute statement; SQL [n/a]; constraint [cliente.ruc];")) {
				error = "Ya existe un cliente registrado con ese ruc";
			}
			if (e.getMessage().contains("could not execute statement; SQL [n/a]; constraint [cliente.nombre];")) {
				error = "Ya existe un cliente registrado con ese nombre";
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.clienteService.eliminarCliente(id);
	}
}
