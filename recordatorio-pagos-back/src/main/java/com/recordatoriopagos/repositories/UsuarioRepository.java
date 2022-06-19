package com.recordatoriopagos.repositories;

import java.math.BigInteger;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recordatoriopagos.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, BigInteger> {

	public abstract Usuario findByCorreo(String correo);

}
