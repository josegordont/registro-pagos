package com.recordatoriopagos.models;

import java.math.BigDecimal;
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
@Table(name = "garantia")
public class Garantia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idGarantia")
	private BigInteger idGarantia;

	private BigInteger idProyecto;

	private Date fechaDevolucion;

	private Date fechaCierre;

	private String estado;

	private Date fechaCreacion;

	private BigDecimal total;

	@JsonIgnore
	private Date fechaActualizacion;

	private BigInteger usuarioCreacion;

	private BigInteger usuarioActualizacion;

	public BigInteger getIdGarantia() {
		return idGarantia;
	}

	public void setIdGarantia(BigInteger idGarantia) {
		this.idGarantia = idGarantia;
	}

	public BigInteger getIdProyecto() {
		return idProyecto;
	}

	public void setIdProyecto(BigInteger idProyecto) {
		this.idProyecto = idProyecto;
	}

	public Date getFechaDevolucion() {
		return fechaDevolucion;
	}

	public void setFechaDevolucion(Date fechaDevolucion) {
		this.fechaDevolucion = fechaDevolucion;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaCierre() {
		return fechaCierre;
	}

	public void setFechaCierre(Date fechaCierre) {
		this.fechaCierre = fechaCierre;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
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
