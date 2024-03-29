package com.recordatoriopagos.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public interface GarantiaDto {

	BigInteger getIdCliente();

	String getNombreCliente();

	BigInteger getIdProyecto();

	String getNombreProyecto();

	BigInteger getIdGarantia();
	
	BigDecimal getTotal();

	Date getFechaDevolucion();

	Date getFechaCierre();

	String getEstado();

}
