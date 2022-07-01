package com.recordatoriopagos.models;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "proyecto")
public class Proyecto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idProyecto")
	private BigInteger idProyecto;

	private BigInteger idCliente;

	@Transient
	private String nombreCliente;

	private String nombre;

	private String descripcion;

	private Date fechaCreacion;

	@JsonIgnore
	private Date fechaActualizacion;

	public Proyecto() {
	}

	public Proyecto(BigInteger idProyecto, BigInteger idCliente, String nombreCliente, String nombre,
			String descripcion) {
		this.idProyecto = idProyecto;
		this.nombreCliente = nombreCliente;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.idCliente = idCliente;
	}

	public BigInteger getIdProyecto() {
		return idProyecto;
	}

	public void setIdProyecto(BigInteger idProyecto) {
		this.idProyecto = idProyecto;
	}

	public BigInteger getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(BigInteger idCliente) {
		this.idCliente = idCliente;
	}

	public String getNombreCliente() {
		return nombreCliente;
	}

	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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

}
