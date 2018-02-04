package br.com.mv.service;

import java.util.List;

import br.com.mv.model.Pessoa;

public interface PessoaService {
	
	Pessoa salvar(Pessoa pessoa);
	Pessoa listar(Long id);
	List<Pessoa> listarTodos();
	Pessoa atualizar(Pessoa pessoa);
	void deletar(Long id);
	Pessoa deletarTelefone(Long id, Long telefoneId);
}
