package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Factura;
import com.recordatoriopagos.models.Proyecto;

@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, BigInteger> {

	@Query("SELECT new com.recordatoriopagos.models.Proyecto(p.idProyecto, c.nombre, p.nombre, p.descripcion) FROM Proyecto p LEFT JOIN Cliente c ON p.idCliente = c.idCliente")
	public abstract List<Proyecto> obtenerProyectos();

	@Query(nativeQuery = true, value = "SELECT * FROM factura f WHERE idProyecto = :idProyecto")
	public abstract List<Factura> obtenerFacturasPorProyecto(BigInteger idProyecto);

	public abstract List<Proyecto> findByIdCliente(BigInteger idCliente);

}
