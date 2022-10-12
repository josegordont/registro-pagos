package com.recordatoriopagos.models;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuario")
	private BigInteger idUsuario;

	private String correo;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String contrasena;

	private String nombres;

	private String apellidos;

	private String rol;

	private Date fechaCreacion;

	private Boolean cambiarContrasena;

	@JsonIgnore
	private Date fechaActualizacion;

	private BigInteger usuarioCreacion;

	private BigInteger usuarioActualizacion;

	public BigInteger getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(BigInteger idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaActualizacion() {
		return fechaActualizacion;
	}

	public void setFechaActualizacion(Date fechaActualizacion) {
		this.fechaActualizacion = fechaActualizacion;
	}

	public Boolean getCambiarContrasena() {
		return cambiarContrasena;
	}

	public void setCambiarContrasena(Boolean cambiarContrasena) {
		this.cambiarContrasena = cambiarContrasena;
	}

	public BigInteger getUsuarioCreacion() {
		return usuarioCreacion;
	}

	public void setUsuarioCreacion(BigInteger usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}

	public BigInteger getUsuarioActualizacion() {
		return usuarioActualizacion;
	}

	public void setUsuarioActualizacion(BigInteger usuarioActualizacion) {
		this.usuarioActualizacion = usuarioActualizacion;
	}
	
}
