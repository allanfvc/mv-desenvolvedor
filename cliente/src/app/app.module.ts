import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { FormsModule} from '@angular/forms';
import 'rxjs/add/operator/map';

import { PessoaModule } from './pessoa/pessoa.module';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagemComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    PessoaModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
