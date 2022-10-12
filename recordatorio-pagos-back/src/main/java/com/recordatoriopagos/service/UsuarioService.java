package com.recordatoriopagos.service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.recordatoriopagos.dto.CambioContrasenaDto;
import com.recordatoriopagos.models.Usuario;
import com.recordatoriopagos.repositories.UsuarioRepository;
import com.recordatoriopagos.util.Contrasena;
import com.recordatoriopagos.util.EnvioMail;

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

	public void guardarUsuario(Usuario usuario) throws AddressException, MessagingException {
		if (usuario.getIdUsuario() != null) {
			usuario.setFechaActualizacion(new Date());
			usuario.setContrasena(usuarioRepository.findById(usuario.getIdUsuario()).get().getContrasena());
			usuarioRepository.save(usuario);
		} else {
			StringBuilder bodyMail = new StringBuilder();
			bodyMail.append("<p>Estimado <b>{{nombres}}</b><br><br>");
			bodyMail.append(
					"Para acceder a la aplicaci&oacute;n recordatorio de pagos por favor utiliza la siguiente contrase&ntilde;a:<br>");
			bodyMail.append("<b>{{contrasena}}</b><br>");
			bodyMail.append(
					"Para ingresar presione aquí: <a href=\"http://192.168.100.174:4200/login\">Recordatorio Pagos</a><br><br>");
			bodyMail.append("Saludos,<br>Recordatorio Pagos.</p>");
			String contrasena = Contrasena.alphaNumericString();
			usuario.setFechaCreacion(new Date());
			usuario.setUsuarioCreacion(usuario.getUsuarioActualizacion());
			usuario.setUsuarioActualizacion(null);
			usuario.setContrasena(BCrypt.hashpw(contrasena, BCrypt.gensalt()));
			usuario.setCambiarContrasena(Boolean.TRUE);
			EnvioMail envioMail = new EnvioMail();
			envioMail
					.sendEmail(
							"Usuario Recordatorio de Pagos", bodyMail.toString()
									.replace("{{nombres}}", usuario.getNombres()).replace("{{contrasena}}", contrasena),
							new String[] { usuario.getCorreo() }, "3");
			usuarioRepository.save(usuario);
		}
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

	public String cambioContrasena(CambioContrasenaDto cambioContrasenaDto) {
		Usuario usuario = usuarioRepository.findByCorreo(cambioContrasenaDto.getCorreo());
		if (usuario == null) {
			return "El usuario ingresado no existe";
		}
		if (!BCrypt.checkpw(cambioContrasenaDto.getContrasena(), usuario.getContrasena())) {
			return "La contraseña actual es incorrecta";
		}
		usuario.setContrasena(BCrypt.hashpw(cambioContrasenaDto.getNuevaContrasena(), BCrypt.gensalt()));
		usuario.setCambiarContrasena(Boolean.FALSE);
		usuarioRepository.save(usuario);
		return "OK";
	}
}
