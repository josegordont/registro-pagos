package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.recordatoriopagos.dto.GarantiaDto;
import com.recordatoriopagos.dto.NotificacionGarantiaDto;
import com.recordatoriopagos.models.Garantia;

@Repository
public interface GarantiaRepository extends CrudRepository<Garantia, BigInteger> {

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre nombreCliente, p.idProyecto , p.nombre nombreProyecto, g.idGarantia , g.fechaDevolucion , g.fechaCierre , g.estado FROM garantia g LEFT JOIN proyecto p ON g.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE g.estado = 'abierto' ORDER BY g.fechaDevolucion")
	public abstract List<GarantiaDto> obtenerGarantias();

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre nombreCliente, p.idProyecto , p.nombre nombreProyecto, g.idGarantia , g.fechaDevolucion , g.fechaCierre , g.estado FROM garantia g LEFT JOIN proyecto p ON g.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE g.estado = 'cerrado' ORDER BY g.fechaCierre DESC")
	public abstract List<GarantiaDto> obtenerGarantiasHistoricas();

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre nombreCliente, p.idProyecto , p.nombre nombreProyecto, g.idGarantia , g.fechaDevolucion , g.fechaCierre , g.estado, TIMESTAMPDIFF(DAY, CURDATE(), g.fechaDevolucion) diasFechaFin FROM garantia g LEFT JOIN proyecto p ON g.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente LEFT JOIN parametro p2 ON p2.clave = :claveParametro WHERE g.estado = 'abierto' AND IFNULL(g.numNotificaciones, 0) = :numNotificacion AND TIMESTAMPDIFF(DAY, CURDATE(), g.fechaDevolucion) <= CONVERT(p2.valor, UNSIGNED INTEGER) ORDER BY g.fechaDevolucion")
	public abstract List<NotificacionGarantiaDto> obtenerGarantiasNotificacion(String claveParametro,
			Integer numNotificacion);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE garantia g set numNotificaciones = IFNULL(numNotificaciones, 0)+ 1 WHERE idGarantia = :idGarantia")
	public abstract void actualizarNumNotificaciones(BigInteger idGarantia);

	public abstract Optional<Garantia> findByIdProyecto(BigInteger idProyecto);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE garantia g set estado = 'cerrado', fechaCierre = now() WHERE idGarantia IN :idGarantias")
	public abstract void cerrarVariasGarantias(@Param("idGarantias") List<BigInteger> idGarantias);

}
