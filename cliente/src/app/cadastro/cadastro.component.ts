import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PessoaComponent, TelefoneComponent } from '../pessoa/pessoa.component';
import { PessoaService } from '../pessoa/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    pessoa: PessoaComponent = new PessoaComponent();
    telefone: TelefoneComponent = new TelefoneComponent();
    service: PessoaService;
    route: ActivatedRoute;
    router: Router;
    mensagem: string = '';

    constructor(service: PessoaService, route: ActivatedRoute, router: Router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.route.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this.service.buscarPorId(id).subscribe(
                    pessoa => {
                        this.pessoa = pessoa;
                    }, error => {
                        console.log(error);
                    }
                );
            }
        })
    }

    cadastrar(event) {
        event.preventDefault();
        let result;
        if (this.pessoa.id) {
            this.service.atualizar(this.pessoa).subscribe(
                res =>{
                    this.pessoa = res.json();
                    this.router.navigate(['']);
                },
                err =>{
                    console.log(err);
                    this.mensagem = "Não foi possível realizar esta operação";
                });
        } else {
            this.service.cadastrar(this.pessoa).subscribe(
            res =>{
                this.pessoa = new PessoaComponent();
                this.mensagem = ''
            },
            err =>{
                console.log(err);
                this.mensagem = "Não foi possível realizar esta operação";
            });
        }
    }

    removerTelefone(event,telefone){
        event.preventDefault();
        this.service.removerTelefone(this.pessoa, telefone).subscribe(
            res => { 
                this.pessoa = res;
                this.mensagem = '';
            },
            err => { 
                console.log (err);
                this.mensagem = "Não foi possível realizar esta operação";
            }
        );
    }

    adicionarTelefone(event) {
        event.preventDefault();
        this.pessoa.telefones.push(this.telefone);
        this.telefone = new TelefoneComponent();
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
}