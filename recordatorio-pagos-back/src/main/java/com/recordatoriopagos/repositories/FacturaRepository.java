package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Factura;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, BigInteger> {

	@Query("SELECT new com.recordatoriopagos.models.Factura(c.idCliente , c.nombre , p.idProyecto , p.nombre , f.idFactura, f.tipo , f.numeroFactura , f.monto , f.fechaPago , f.fechaPago) FROM Factura f LEFT JOIN Proyecto p ON f.idProyecto = p.idProyecto LEFT JOIN Cliente c ON p.idCliente = c.idCliente")
	public abstract List<Factura> obtenerFacturas();

}
