package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Cliente;
import com.recordatoriopagos.repositories.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	ClienteRepository clienteRepository;

	public List<Cliente> obtenerClientes() {
		return (List<Cliente>) clienteRepository.findAll();
	}

	public Optional<Cliente> obtenerPorId(BigInteger id) {
		return clienteRepository.findById(id);
	}

	public Cliente guardarCliente(Cliente cliente) {
		if (cliente.getFechaCreacion() == null) {
			cliente.setFechaCreacion(new Date());
		} else {
			cliente.setFechaActualizacion(new Date());
		}
		return clienteRepository.save(cliente);
	}

	public boolean eliminarUsuario(BigInteger idCliente) {
		try {
			if (clienteRepository.obtenerFacturasPorCliente(idCliente).size() > 0) {
				return false;
			}
			clienteRepository.deleteById(idCliente);
			return true;
		} catch (Exception err) {
			return false;
		}
	}
}
