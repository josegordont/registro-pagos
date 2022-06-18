package com.recordatoriopagos.repositories;

import java.math.BigInteger;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Factura;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, BigInteger> {

}
