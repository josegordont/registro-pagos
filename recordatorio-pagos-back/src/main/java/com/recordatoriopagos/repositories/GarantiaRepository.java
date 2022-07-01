package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.dto.GarantiaDto;
import com.recordatoriopagos.models.Garantia;

@Repository
public interface GarantiaRepository extends CrudRepository<Garantia, BigInteger> {

	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre nombreCliente, p.idProyecto , p.nombre nombreProyecto, g.idGarantia , g.fechaDevolucion , g.fechaCierre , g.estado FROM garantia g LEFT JOIN proyecto p ON g.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE g.estado = 'abierto' ORDER BY g.fechaDevolucion")
	public abstract List<GarantiaDto> obtenerGarantias();
	
	@Query(nativeQuery = true, value = "SELECT c.idCliente, c.nombre nombreCliente, p.idProyecto , p.nombre nombreProyecto, g.idGarantia , g.fechaDevolucion , g.fechaCierre , g.estado FROM garantia g LEFT JOIN proyecto p ON g.idProyecto = p.idProyecto LEFT JOIN cliente c ON p.idCliente = c.idCliente WHERE g.estado = 'cerrado' ORDER BY g.fechaCierre DESC")
	public abstract List<GarantiaDto> obtenerGarantiasHistoricas();

	public abstract Optional<Garantia> findByIdProyecto(BigInteger idProyecto);

}
