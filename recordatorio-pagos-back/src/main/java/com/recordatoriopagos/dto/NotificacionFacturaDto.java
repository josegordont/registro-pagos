package com.recordatoriopagos.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public interface NotificacionFacturaDto {

	BigInteger getIdCliente();

	String getNombreCliente();

	BigInteger getIdProyecto();

	String getNombreProyecto();

	BigInteger getIdFactura();

	String getNumeroFactura();

	BigDecimal getMonto();
	
	BigDecimal getRetencion();
	
	BigDecimal getIva();
	
	BigDecimal getTotal();

	Date getFechaInicio();

	Date getFechaFin();

	String getEstado();

	Integer getDiasFechaFin();

}
