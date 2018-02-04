import { Http, Headers, Response } from '@angular/http';
import { PessoaComponent, TelefoneComponent } from './pessoa.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PessoaService{

    http: Http;
    headers: Headers;
    url: string = 'http://localhost:8080/v1/pessoas';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

    }

    cadastrar (pessoa: PessoaComponent):  Observable<Response>{
        return this.http.post(this.url, JSON.stringify(pessoa), { headers: this.headers })
    }

    listar(): Observable<PessoaComponent[]>{
        return this.http.get(this.url).map( res => res.json());
    }

    buscarPorId(id): Observable<PessoaComponent>{
        return this.http.get(this.url+"/"+id).map( res => res.json());
    }

    remover(pessoa: PessoaComponent) :  Observable<Response> {
        return this.http.delete(this.url+"/"+pessoa.id);
    }

    removerTelefone(pessoa: PessoaComponent, telefone:TelefoneComponent): Observable<PessoaComponent>{
        return this.http.delete(this.url+"/"+pessoa.id+"/telefones/"+telefone.id ).map(res => res.json());
    }

    atualizar(pessoa: PessoaComponent){
        return this.http.put(this.url+"/"+pessoa.id, pessoa, { headers: this.headers });
    }
}