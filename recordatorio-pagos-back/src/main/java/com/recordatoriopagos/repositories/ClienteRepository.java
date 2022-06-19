package com.recordatoriopagos.repositories;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Cliente;
import com.recordatoriopagos.models.Factura;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, BigInteger> {

	@Query(nativeQuery = true, value = "SELECT * FROM factura f WHERE idProyecto IN ( SELECT idProyecto FROM proyecto p WHERE idCliente = :idCliente)")
	public abstract List<Factura> obtenerFacturasPorCliente(BigInteger idCliente);

}
