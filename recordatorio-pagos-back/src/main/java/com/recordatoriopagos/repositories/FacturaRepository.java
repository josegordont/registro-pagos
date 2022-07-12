package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.recordatoriopagos.dto.FacturaDto;
import com.recordatoriopagos.dto.NotificacionFacturaDto2;
import com.recordatoriopagos.models.Factura;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, BigInteger> {

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre as nombreCliente, p.idProyecto, p.nombre as nombreProyecto, f.idFactura, f.numeroFactura, f.monto, f.fechaInicio, f.fechaFin, RANK() OVER (PARTITION BY p.idProyecto ORDER BY f.estado, f.fechaFin DESC, f.idFactura DESC ) rankFechaFin, f.estado, p.estado estadoProyecto, f.fechaCierre FROM factura f LEFT JOIN proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE f.estado = 'abierto' and p.estado = 'abierto' ORDER BY f.fechaFin DESC")
	public abstract List<FacturaDto> obtenerFacturas();

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre as nombreCliente, p.idProyecto, p.nombre as nombreProyecto, f.idFactura, f.numeroFactura, f.monto, f.fechaInicio, f.fechaFin, RANK() OVER (PARTITION BY p.idProyecto ORDER BY f.estado, f.fechaFin DESC, f.idFactura DESC ) rankFechaFin, f.estado, p.estado estadoProyecto, f.fechaCierre FROM factura f LEFT JOIN proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE f.estado = 'abierto' and p.estado = 'cerrado' ORDER BY f.fechaFin DESC")
	public abstract List<FacturaDto> obtenerFacturasACerrar();

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre as nombreCliente, p.idProyecto, p.nombre as nombreProyecto, f.idFactura, f.numeroFactura, f.monto, f.fechaInicio, f.fechaFin, RANK() OVER (PARTITION BY p.idProyecto ORDER BY f.estado, f.fechaFin DESC, f.idFactura DESC ) rankFechaFin, f.estado, p.estado estadoProyecto, f.fechaCierre FROM factura f LEFT JOIN proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE f.estado = 'cerrado' and p.estado = 'cerrado' ORDER BY f.fechaFin DESC")
	public abstract List<FacturaDto> obtenerFacturasCerradas();

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre as nombreCliente, p.idProyecto, p.nombre as nombreProyecto, f.idFactura, f.numeroFactura, f.monto, f.fechaInicio, f.fechaFin, f.estado, TIMESTAMPDIFF(DAY, CURDATE(), f.fechaFin) diasFechaFin FROM factura f LEFT JOIN proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente LEFT JOIN parametro p2 ON p2.clave = :claveParametro WHERE IFNULL(f.numNotificaciones, 0) = :numNotificacion AND TIMESTAMPDIFF(DAY, CURDATE(), f.fechaFin) <= CONVERT(p2.valor, UNSIGNED INTEGER) ORDER BY f.fechaFin DESC")
	public abstract List<NotificacionFacturaDto2> obtenerFacturasNotificacion(String claveParametro,
			Integer numNotificacion);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE factura f set numNotificaciones = IFNULL(numNotificaciones, 0)+ 1 WHERE idFactura = :idFactura")
	public abstract void actualizarNumNotificaciones(BigInteger idFactura);

	public abstract Factura findByNumeroFactura(String numeroFactura);

}
