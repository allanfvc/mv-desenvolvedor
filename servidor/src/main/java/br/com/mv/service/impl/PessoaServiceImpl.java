package br.com.mv.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.mv.model.Pessoa;
import br.com.mv.model.Telefone;
import br.com.mv.repository.PessoaRepository;
import br.com.mv.repository.TelefoneRepository;
import br.com.mv.service.PessoaService;

@Service
public class PessoaServiceImpl implements PessoaService{

	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private TelefoneRepository telefoneRepository;

	@Override
	public Pessoa salvar(Pessoa pessoa) {
		this.telefoneRepository.save(pessoa.getTelefones());
		return this.pessoaRepository.save(pessoa);
	}

	@Override
	public Pessoa listar(Long id) {
		return this.pessoaRepository.findOne(id);
	}

	@Override
	public List<Pessoa> listarTodos() {
		return this.pessoaRepository.findAll();
	}

	@Override
	public Pessoa atualizar(Pessoa pessoa) {
		List<Telefone> telefones = new ArrayList<>();
		for(Telefone telefone: pessoa.getTelefones()) {
			if(telefone.getId() == null) telefones.add(this.telefoneRepository.save(telefone));
			else telefones.add(telefone);
		}
		pessoa.setTelefones(telefones);
		return this.pessoaRepository.save(pessoa);
	}

	@Override
	public void deletar(Long id) {
		this.pessoaRepository.delete(id);		
	}

	@Override
	public Pessoa deletarTelefone(Long id, Long telefoneId) {
		Pessoa pessoa  = this.pessoaRepository.findOne(id);
		Telefone telefone = this.telefoneRepository.findOne(telefoneId);
		if(pessoa.getTelefones().remove(telefone)) {
			this.pessoaRepository.save(pessoa);
		}
		return pessoa;
	}
	
	
}
