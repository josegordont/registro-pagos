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
import javax.persistence.Transient;

@Entity
@Table(name = "factura")
public class Factura {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idFactura")
	private BigInteger idFactura;

	private BigInteger idProyecto;

	private String tipo;

	private String numeroFactura;

	private BigDecimal monto;

	private String estado;

	private Date fechaPago;

	private Integer numNotificaciones;

	private Date fechaCreacion;

	private Date fechaActualizacion;

	@Transient
	private BigInteger idCliente;

	@Transient
	private String nombreCliente;

	@Transient
	private String nombreProyecto;

	public Factura() {

	}

	public Factura(BigInteger idCliente, String nombreCliente, BigInteger idProyecto, String nombreProyecto,
			BigInteger idFactura, String tipo, String numeroFactura, BigDecimal monto, Date fechaPago, Date fechaFin) {
		this.idCliente = idCliente;
		this.nombreCliente = nombreCliente;
		this.idProyecto = idProyecto;
		this.nombreProyecto = nombreProyecto;
		this.idFactura = idFactura;
		this.tipo = tipo;
		this.numeroFactura = numeroFactura;
		this.monto = monto;
		this.fechaPago = fechaPago;
//		this.fechaFin = fechaFin;
	}

	public BigInteger getIdFactura() {
		return idFactura;
	}

	public void setIdFactura(BigInteger idFactura) {
		this.idFactura = idFactura;
	}

	public BigInteger getIdProyecto() {
		return idProyecto;
	}

	public void setIdProyecto(BigInteger idProyecto) {
		this.idProyecto = idProyecto;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNumeroFactura() {
		return numeroFactura;
	}

	public void setNumeroFactura(String numeroFactura) {
		this.numeroFactura = numeroFactura;
	}

	public BigDecimal getMonto() {
		return monto;
	}

	public void setMonto(BigDecimal monto) {
		this.monto = monto;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaPago() {
		return fechaPago;
	}

	public void setFechaPago(Date fechaPago) {
		this.fechaPago = fechaPago;
	}

	public Integer getNumNotificaciones() {
		return numNotificaciones;
	}

	public void setNumNotificaciones(Integer numNotificaciones) {
		this.numNotificaciones = numNotificaciones;
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

	public String getNombreProyecto() {
		return nombreProyecto;
	}

	public void setNombreProyecto(String nombreProyecto) {
		this.nombreProyecto = nombreProyecto;
	}

}
