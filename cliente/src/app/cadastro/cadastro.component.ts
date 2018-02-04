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
            result = this.service.atualizar(this.pessoa).subscribe(
                res=>{
                    this.pessoa = res.json();
                },
                err=>{
                    console.log(err);
                });
            this.router.navigate(['']);
        } else {
            result = this.service.cadastrar(this.pessoa);
            this.pessoa = new PessoaComponent();
        }
    }

    removerTelefone(event,telefone){
        event.preventDefault();
        this.service.removerTelefone(this.pessoa, telefone).subscribe(
            res => {console.log(res.telefones)},
            error => { console.log (error)}
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