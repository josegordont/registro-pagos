package com.recordatoriopagos.repositories;

import java.math.BigInteger;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Cliente;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, BigInteger> {

}
