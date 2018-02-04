import { Component } from '@angular/core';
import { PessoaComponent } from '../pessoa/pessoa.component';
import { PessoaService } from '../pessoa/pessoa.service';
import { error } from 'util';


@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    pessoas: PessoaComponent[] = [];
    pessoasSemFiltro: PessoaComponent[] = [];
    service: PessoaService;
    pesquisa = { nome: '', cpf: '' }

    constructor(service: PessoaService) {
        this.service = service;
        this.listar();
    }

    remover(pessoa) {
        this.service.remover(pessoa).subscribe(
            res => {
                let id = this.pessoas.indexOf(pessoa);
                let tmpPessoas = this.pessoas.slice(0);
                tmpPessoas.splice(id, 1);
                this.pessoas = tmpPessoas;
            },
            error => {
                console.log(error);
            });
    }

    listar() {
        this.service.listar().subscribe(pessoas => {
            pessoas.forEach(pessoa => {
                pessoa.idade = this.calcularIdade(pessoa.dataNascimento);
            })
            this.pessoas = pessoas;
            this.pessoasSemFiltro = pessoas;
        },
            error => {
                console.log(error);
            });
    }

    calcularIdade(dataNascimento: string) {
        let hoje = new Date();
        let nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        var mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    }

    formatarCpf(event) {
        let cpf = '###.###.###-##'
        if (event.which !== 0) {
            var i = event.target.value.length;
            var saida = cpf.substring(0, 1);
            var texto = cpf.substring(i)

            if (texto.substring(0, 1) != saida) {
                event.target.value += texto.substring(0, 1);
            }
        }
    }

    filtrar(event) {
        let nome = this.pesquisa.nome.toLowerCase();
        let cpf = this.pesquisa.cpf.toLowerCase();
        if (cpf || nome) {
            let pessoasFiltradas = this.pessoasSemFiltro.filter(pessoa =>
                pessoa.nome.toLowerCase().includes(nome) && pessoa.cpf.toLowerCase().includes(cpf)
            );
            this.pessoas = pessoasFiltradas;
        }else{
            this.pessoas = this.pessoasSemFiltro;
        }
        this.pesquisa = { nome: '', cpf: '' };
    }

}