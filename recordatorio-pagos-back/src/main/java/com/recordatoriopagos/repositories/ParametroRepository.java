package com.recordatoriopagos.repositories;

import java.math.BigInteger;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Parametro;

@Repository
public interface ParametroRepository extends CrudRepository<Parametro, BigInteger> {

	public abstract Parametro findByClave(String clave);

}
