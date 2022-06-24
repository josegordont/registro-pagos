package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Factura;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, BigInteger> {

	@Query("SELECT new com.recordatoriopagos.models.Factura(c.idCliente, c.nombre, p.idProyecto, p.nombre, f.idFactura, f.numeroFactura, f.monto, f.fechaInicio, f.fechaFin) FROM Factura f LEFT JOIN Proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN Cliente c ON p.idCliente = c.idCliente ORDER BY f.fechaFin DESC")
	public abstract List<Factura> obtenerFacturas();

}
