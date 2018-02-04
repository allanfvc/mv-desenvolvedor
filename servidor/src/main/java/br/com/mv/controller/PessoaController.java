package br.com.mv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.mv.model.Pessoa;
import br.com.mv.service.PessoaService;

@RestController
public class PessoaController {
	
	private static final String URL= "/v1/pessoas";
	
	@Autowired
    private PessoaService pessoaService;

    @RequestMapping(value = URL, method = RequestMethod.GET)
    public List<Pessoa> listarPessoas(){
        return this.pessoaService.listarTodos();
    }

    @RequestMapping(value = URL+"/{id}", method = RequestMethod.GET)
    public Pessoa listarPessoa(@PathVariable("id") Long id){
        return this.pessoaService.listar(id);
    }

    @RequestMapping(value = URL, method = RequestMethod.POST)
    public List<Pessoa> salvarPessoa(@RequestBody Pessoa pessoa){
        this.pessoaService.salvar(pessoa);
        return this.pessoaService.listarTodos();
    }

    @RequestMapping(value = URL+"/{id}", method = RequestMethod.PUT)
    public Pessoa atualizarPessoa(@RequestBody Pessoa pessoa){
        return this.pessoaService.atualizar(pessoa);
    }

    @RequestMapping(value = URL+"/{id}", method = RequestMethod.DELETE)
    public List<Pessoa> deletarPessoa(@PathVariable("id") Long id){
        this.pessoaService.deletar(id);
        return this.pessoaService.listarTodos();
    }
    
    @RequestMapping(value = URL+"/{id}/telefones/{telefoneId}", method = RequestMethod.DELETE)
    public Pessoa deletarTelefone(@PathVariable("id") Long id, @PathVariable("telefoneId") Long telefoneId){        
        return this.pessoaService.deletarTelefone(id, telefoneId);
    }

}
