package com.recordatoriopagos.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

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

import com.recordatoriopagos.dto.CambioContrasenaDto;
import com.recordatoriopagos.models.Usuario;
import com.recordatoriopagos.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	UsuarioService usuarioService;

	@GetMapping()
	public List<Usuario> obtenerUsuarios() {
		return usuarioService.obtenerUsuarios();
	}

	@GetMapping(path = "/{id}")
	public Optional<Usuario> obtenerUsuarioPorId(@PathVariable("id") BigInteger id) {
		return this.usuarioService.obtenerPorId(id);
	}

	@PostMapping()
	public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario) {
		try {
			usuarioService.guardarUsuario(usuario);
			return new ResponseEntity<Usuario>(HttpStatus.OK);
		} catch (MessagingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("No se puede contactar con la dirección de correo ingresada");
		} catch (Exception e) {
			String error = "Se produjo un error en el sistema";
			if (e.getMessage().contains("could not execute statement; SQL [n/a]; constraint [usuario.correo];")) {
				error = "Ya existe un usurio registrado con ese id";
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}

	@DeleteMapping(path = "/{id}")
	public Boolean eliminarPorId(@PathVariable("id") BigInteger id) {
		return this.usuarioService.eliminarUsuario(id);
	}

	@PostMapping(path = "/login")
	public Usuario login(@RequestBody Usuario usuario) {
		return this.usuarioService.login(usuario);
	}

	@PutMapping(path = "/cambio-contrasena")
	public ResponseEntity<?> cambioContrasena(@RequestBody CambioContrasenaDto usuario) {
		try {
			String mensaje = this.usuarioService.cambioContrasena(usuario);
			if (mensaje.equals("OK")) {
				return new ResponseEntity<String>(HttpStatus.OK);
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Se ha producido un error en el sistema");
		}
	}

}
