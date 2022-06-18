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
	public Cliente guardarCliente(@RequestBody Cliente cliente) {
		return this.clienteService.guardarCliente(cliente);
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.clienteService.eliminarUsuario(id);
	}
}
