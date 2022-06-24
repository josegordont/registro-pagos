package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.models.Usuario;
import com.recordatoriopagos.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;

	public List<Usuario> obtenerUsuarios() {
		return (List<Usuario>) usuarioRepository.findAll();
	}

	public Optional<Usuario> obtenerPorId(BigInteger id) {
		return usuarioRepository.findById(id);
	}

	public Usuario guardarUsuario(Usuario usuario) {
		if (usuario.getIdUsuario() != null) {
			usuario.setContrasena(usuarioRepository.findById(usuario.getIdUsuario()).get().getContrasena());
		} else {
			usuario.setContrasena(BCrypt.hashpw(usuario.getContrasena(), BCrypt.gensalt()));
		}
		if (usuario.getFechaCreacion() == null) {
			usuario.setFechaCreacion(new Date());
		} else {
			usuario.setFechaActualizacion(new Date());
		}
		return usuarioRepository.save(usuario);
	}

	public boolean eliminarUsuario(BigInteger idUsuario) {
		try {
			usuarioRepository.deleteById(idUsuario);
			return true;
		} catch (Exception err) {
			return false;
		}
	}

	public Usuario login(Usuario usuario) {
		Usuario usuarioEncontrado = usuarioRepository.findByCorreo(usuario.getCorreo());
		if (usuarioEncontrado == null) {
			return null;
		}
		if (BCrypt.checkpw(usuario.getContrasena(), usuarioEncontrado.getContrasena())) {
			return usuarioEncontrado;
		}
		return null;
	}
}
