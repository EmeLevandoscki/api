package com.atividade.api.DAO;

import org.springframework.data.repository.CrudRepository;
import com.atividade.api.model.usuario;

public interface IUsuario extends CrudRepository<usuario,Integer> {
    
}
