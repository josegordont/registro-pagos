package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.models.Proyecto;

@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, BigInteger> {

	@Query("SELECT new com.recordatoriopagos.models.Proyecto(p.idProyecto, c.idCliente, c.nombre, p.nombre, p.descripcion) FROM Proyecto p LEFT JOIN Cliente c ON p.idCliente = c.idCliente where p.estado='abierto'")
	public abstract List<Proyecto> obtenerProyectos();

	@Query(nativeQuery = true, value = "SELECT * FROM factura f WHERE idProyecto = :idProyecto")
	public abstract List<Factura> obtenerFacturasPorProyecto(BigInteger idProyecto);

	public abstract List<Proyecto> findByIdClienteAndEstado(BigInteger idCliente, String estado);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE proyecto p set estado = 'cerrado' WHERE idProyecto = :idProyecto")
	public abstract void cerrarProyecto(BigInteger idProyecto);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "UPDATE proyecto p set estado = 'abierto' WHERE idProyecto = :idProyecto")
	public abstract void abrirProyecto(BigInteger idProyecto);

}
