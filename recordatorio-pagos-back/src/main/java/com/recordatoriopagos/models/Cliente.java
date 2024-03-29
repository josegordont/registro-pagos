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

@Entity
@Table(name = "cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idCliente")
	private BigInteger idCliente;

	private String ruc;

	private String nombre;

	private Date fechaCreacion;

	@JsonIgnore
	private Date fechaActualizacion;

	private BigInteger usuarioCreacion;

	private BigInteger usuarioActualizacion;

	public BigInteger getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(BigInteger idCliente) {
		this.idCliente = idCliente;
	}

	public String getRuc() {
		return ruc;
	}

	public void setRuc(String ruc) {
		this.ruc = ruc;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
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
