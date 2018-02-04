import { NgModule } from '@angular/core';
import { PessoaComponent } from './pessoa.component';
import { PessoaService } from './pessoa.service';
@NgModule({
    declarations: [ PessoaComponent],
    exports: [ PessoaComponent],
    providers: [ PessoaService]
})
export class PessoaModule { }