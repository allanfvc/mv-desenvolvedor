import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'pessoa',
    templateUrl: './pessoa.component.html'
})
export class PessoaComponent {
    
    id:number;
    nome:string;
    cpf:string; 
    email:string; 
    dataNascimento:string;
    telefones: TelefoneComponent[] = [];
    idade: number;
    
}

export class TelefoneComponent {
    
    id:number;
    ddd:string;
    numero:string;
}
