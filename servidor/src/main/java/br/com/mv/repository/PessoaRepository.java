package br.com.mv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.mv.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

}
