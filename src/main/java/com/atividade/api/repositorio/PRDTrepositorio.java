package com.atividade.api.repositorio;

import com.atividade.api.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PRDTrepositorio extends JpaRepository<Produto, Long> {
}

